import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { UPCOMING_TOURS } from '@/lib/trebevic-data';

export const runtime = 'nodejs';

const RECIPIENT = 'psdtrebevic@icloud.com';
const EXPERIENCE_LABELS = {
  pocetnik: 'Početnik',
  rekreativac: 'Rekreativac',
  iskusan: 'Iskusan planinar',
} as const;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_MAX_IPS = 5000;
const requestsByIp = new Map<string, { count: number; resetAt: number }>();

type RegistrationRequest = {
  tourId: string;
  fullName: string;
  email: string;
  phone: string;
  emergencyContact: string;
  experienceLevel: keyof typeof EXPERIENCE_LABELS;
  gearConfirmed: boolean;
  website?: string;
};

function isRegistrationRequest(value: unknown): value is RegistrationRequest {
  if (typeof value !== 'object' || value === null) return false;
  const data = value as Record<string, unknown>;
  return (
    typeof data.tourId === 'string' &&
    typeof data.fullName === 'string' &&
    typeof data.email === 'string' &&
    typeof data.phone === 'string' &&
    typeof data.emergencyContact === 'string' &&
    typeof data.experienceLevel === 'string' &&
    Object.hasOwn(EXPERIENCE_LABELS, data.experienceLevel) &&
    data.gearConfirmed === true &&
    (data.website === undefined || typeof data.website === 'string')
  );
}

function isRateLimited(ip: string, now: number): boolean {
  if (requestsByIp.size > 1000) {
    for (const [knownIp, limit] of requestsByIp) {
      if (limit.resetAt <= now) requestsByIp.delete(knownIp);
    }
  }

  const current = requestsByIp.get(ip);
  if (!current || current.resetAt <= now) {
    if (requestsByIp.size >= RATE_LIMIT_MAX_IPS) return true;
    requestsByIp.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (current.count >= RATE_LIMIT_MAX_REQUESTS) return true;
  current.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: 'Neispravni podaci prijave.' }, { status: 400 });
  }

  if (!isRegistrationRequest(data)) {
    return NextResponse.json({ error: 'Provjerite unesene podatke i pokušajte ponovo.' }, { status: 400 });
  }

  if (data.website) {
    return NextResponse.json({ error: 'Neispravni podaci prijave.' }, { status: 400 });
  }

  const fullName = data.fullName.trim();
  const email = data.email.trim();
  const phone = data.phone.trim();
  const emergencyContact = data.emergencyContact.trim();
  if (
    fullName.length < 3 ||
    fullName.length > 120 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 254 ||
    phone.length < 6 ||
    phone.length > 40 ||
    emergencyContact.length > 160
  ) {
    return NextResponse.json({ error: 'Provjerite unesene podatke i pokušajte ponovo.' }, { status: 400 });
  }

  const tour = UPCOMING_TOURS.find((item) => item.id === data.tourId);
  if (!tour || tour.status === 'Popunjeno') {
    return NextResponse.json({ error: 'Odabrana tura nije dostupna za prijavu.' }, { status: 400 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || req.headers.get('x-real-ip')
    || 'unknown';
  if (isRateLimited(ip, Date.now())) {
    return NextResponse.json(
      { error: 'Previše pokušaja prijave. Pokušajte ponovo za nekoliko minuta.' },
      { status: 429 }
    );
  }

  const gmailUser = process.env.GMAIL_USER?.trim();
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, '');
  if (!gmailUser || !gmailAppPassword) {
    console.error('Tour registration email is not configured: missing Gmail environment variables.');
    return NextResponse.json(
      { error: 'Slanje prijava trenutno nije podešeno. Pokušajte ponovo kasnije.' },
      { status: 503 }
    );
  }

  const subject = `Prijava za turu: ${tour.title}`;
  const text = [
    'PRIJAVA ZA PLANINARSKU TURU - PSD TREBEVIĆ SARAJEVO',
    '',
    `Tura: ${tour.title}`,
    `Datum: ${tour.date}`,
    `Vrijeme polaska: ${tour.time}`,
    `Mjesto okupljanja: ${tour.meetingPoint}`,
    '',
    `Ime i prezime: ${fullName}`,
    `Email: ${email}`,
    `Telefon: ${phone}`,
    `Kontakt osoba za hitne slučajeve: ${emergencyContact || 'Nije navedena'}`,
    `Planinarsko iskustvo: ${EXPERIENCE_LABELS[data.experienceLevel]}`,
    'Obavezna oprema: Potvrđeno',
  ].join('\n');

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });

    await transporter.sendMail({
      from: { name: 'PSD Trebević', address: gmailUser },
      to: RECIPIENT,
      replyTo: email,
      subject,
      text,
    });

    return NextResponse.json({ sent: true });
  } catch (error) {
    console.error('Gmail rejected or failed to send a tour registration email:', error);
    return NextResponse.json(
      { error: 'Prijavu trenutno nije moguće poslati. Provjerite internet i pokušajte ponovo.' },
      { status: 502 }
    );
  }
}
