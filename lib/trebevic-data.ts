export interface Trail {
  id: string;
  name: string;
  subtitle: string;
  distanceKm: number;
  elevationGainM: number;
  elevationLossM: number;
  startElevationM: number;
  peakElevationM: number;
  estimatedHours: number;
  difficulty: 'Lako' | 'Umjereno' | 'Zahtjevno' | 'Vrlo zahtjevno';
  rating: number;
  reviewCount: number;
  description: string;
  startPoint: string;
  endPoint: string;
  waterSources: string[];
  mountainHuts: string[];
  keyHighlights: string[];
  elevationProfile: { distanceKm: number; elevationM: number; label: string }[];
  gpxFile?: string;
  isLoop?: boolean;
  image: string;
}

export interface ClubTour {
  id: string;
  title: string;
  date: string;
  time: string;
  meetingPoint: string;
  trailName: string;
  difficulty: 'Lako' | 'Umjereno' | 'Zahtjevno';
  durationHours: number;
  guideName: string;
  guideTitle: string;
  maxParticipants: number;
  currentRegistered: number;
  feeBAM: number;
  requiredGear: string[];
  included: string[];
  status: 'Otvorene prijave' | 'Zadnja mjesta' | 'Popunjeno';
}

export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  summary: string;
  content: string[];
  image: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  location: string;
  category: 'Pejzaži' | 'Zima' | 'Olimpijska baština' | 'Ture & Druženja' | 'Flora & Fauna';
  photographer: string;
  cameraInfo: string;
  aspect: 'landscape' | 'portrait' | 'square';
  src: string;
  description: string;
}

export const TREBEVIC_TRAILS: Trail[] = [
  {
    id: 'sofe-summit-ridge',
    name: 'Hotel Pino – dom Jure Franko – vrh Sofe',
    subtitle: 'Kružna tura od Hotela Pino preko Dobrih Voda i doma Jure Franko do vrha Sofe, s povratkom do Hotela Pino',
    distanceKm: 8.3,
    elevationGainM: 570,
    elevationLossM: 570,
    startElevationM: 1072,
    peakElevationM: 1629,
    estimatedHours: 3.4,
    difficulty: 'Umjereno',
    rating: 4.9,
    reviewCount: 142,
    description: 'Kružna tura počinje i završava kod Hotela Pino. Prema priloženom Outdooractive GPX tragu, ruta vodi preko izvora Dobre Vode (1310m) i Doma Jure Franko (1430m) do vrha Sofe (1629m), a zatim se šumskim stazama vraća do Hotela Pino. Dužina i visinski profil su približni.',
    startPoint: 'Hotel Pino Nature (1072m)',
    endPoint: 'Hotel Pino Nature (1072m)',
    waterSources: ['Prirodni izvor Dobre Vode (1310m)'],
    mountainHuts: ['Hotel Pino Nature (1070m)', 'Restoran Vidikovac (1160m)', 'Planinarski dom Trebević (1187m)', 'Planinarski dom Jure Franko (1430m)'],
    keyHighlights: ['Hotel Pino Nature', 'Izvor Dobre Vode (1310m)', 'Dom Jure Franko (1430m)', 'Vrh Sofe (1629m)'],
    elevationProfile: [
      { distanceKm: 0, elevationM: 1072, label: 'Hotel Pino' },
      { distanceKm: 1.6, elevationM: 1310, label: 'Dobre Vode' },
      { distanceKm: 3.6, elevationM: 1430, label: 'dom Jure Franko' },
      { distanceKm: 5.2, elevationM: 1629, label: 'vrh Sofe' },
      { distanceKm: 6.5, elevationM: 1373, label: 'povratak kroz šumu' },
      { distanceKm: 8.3, elevationM: 1072, label: 'Hotel Pino' },
    ],
    gpxFile: '/gpx/hotel-pino-sofe-jure-franko-hotel-pino.gpx',
    isLoop: true,
    image: '/images/hero_summit.jpg',
  },
  {
    id: 'bogusevac-bob-staza-vidikovac',
    name: 'Boguševac – bob staza – Vidikovac',
    subtitle: 'Kružna planinarska tura od Boguševca preko bob staze do Vidikovca i nazad',
    distanceKm: 5.1,
    elevationGainM: 399,
    elevationLossM: 399,
    startElevationM: 768,
    peakElevationM: 1148,
    estimatedHours: 2.1,
    difficulty: 'Umjereno',
    rating: 0,
    reviewCount: 0,
    description: 'Kružna planinarska tura snimljena GPS tragom, počinje i završava u Boguševcu (768m), penje se preko bob staze do Vidikovca (1148m) i vraća se istom stazom.',
    startPoint: 'Boguševac (768m)',
    endPoint: 'Boguševac (768m)',
    waterSources: ['Prirodni izvor Dobre Vode'],
    mountainHuts: ['Restoran Vidikovac (1160m)'],
    keyHighlights: ['Boguševac (768m)', 'Dionica olimpijske bob staze', 'Vidikovac (1148m)'],
    elevationProfile: [
      { distanceKm: 0, elevationM: 768, label: 'Boguševac' },
      { distanceKm: 1, elevationM: 989, label: 'Bob staza' },
      { distanceKm: 2, elevationM: 1090, label: 'prema Vidikovcu' },
      { distanceKm: 2.5, elevationM: 1148, label: 'Vidikovac' },
      { distanceKm: 3.5, elevationM: 1047, label: 'Povratak' },
      { distanceKm: 5.1, elevationM: 768, label: 'Boguševac' },
    ],
    gpxFile: '/gpx/bogusevac-bob-staza-vidikovac.gpx',
    isLoop: true,
    image: '/images/bobsleigh.jpg',
  },
  {
    id: 'trebevic-educational-trail',
    name: 'Trebević - EDUCATIONAL TRAIL',
    subtitle: 'Edukativna staza od Vidikovca do završne tačke na 1071m',
    distanceKm: 1,
    elevationGainM: 7,
    elevationLossM: 94,
    startElevationM: 1158,
    peakElevationM: 1158,
    estimatedHours: 0.3,
    difficulty: 'Lako',
    rating: 0,
    reviewCount: 0,
    description: 'Edukativna ruta počinje na Vidikovcu (1158m) i završava se nakon približno 1 km na 1071m. Visinske vrijednosti i dužina su izvedene iz priloženog GPX traga.',
    startPoint: 'Vidikovac (1158m)',
    endPoint: 'Završna tačka staze (1071m)',
    waterSources: [],
    mountainHuts: ['Restoran Vidikovac (1160m)'],
    keyHighlights: ['Edukativna staza na Trebeviću', 'Vidikovac (1158m)'],
    elevationProfile: [
      { distanceKm: 0, elevationM: 1158, label: 'Vidikovac' },
      { distanceKm: 0.2, elevationM: 1150, label: 'Edukativna staza' },
      { distanceKm: 0.4, elevationM: 1140, label: 'Staza' },
      { distanceKm: 0.6, elevationM: 1122, label: 'Staza' },
      { distanceKm: 0.8, elevationM: 1110, label: 'Staza' },
      { distanceKm: 1, elevationM: 1071, label: 'Završna tačka' },
    ],
    gpxFile: '/gpx/trebevic-educational-trail.gpx',
    image: '/images/hiking_lodge.jpg',
  },
  {
    id: 'west-ridge-dobre-vode',
    name: 'Zapadni greben i Dobre Vode (Kružna tura)',
    subtitle: 'Divlja staza kroz crnogorične šume, kraške škrape i izvor Dobre Vode',
    distanceKm: 10.4,
    elevationGainM: 610,
    elevationLossM: 610,
    startElevationM: 1070,
    peakElevationM: 1629,
    estimatedHours: 4.2,
    difficulty: 'Zahtjevno',
    rating: 4.9,
    reviewCount: 64,
    description: 'Zahtjevnija i prelijepa planinarska kružna tura. Polazak sa lokaliteta Ravne (1070m n.v.), stazom pored izvora "Tri budalaša" (1190m) do historijskog raskršća i izvora Dobre Vode (1310m n.v.). Odatle se staza penje na stjenoviti Zapadni greben, vodi pored Doma Jure Franko (1430m) i izbija na najviši vrh Sofe (1629m n.v.). Povratak je kružnom stazom preko platoa Vaso Miskin Crni (1480m) nazad na Ravne.',
    startPoint: 'Izletište Ravne / Hotel Pino Nature (1070m)',
    endPoint: 'Vrh Sofe (1629m) i kružni povratak na Ravne',
    waterSources: ['Izvor Tri budalaša (1190m)', 'Prirodni izvor Dobre Vode (1310m)'],
    mountainHuts: ['Dom Jure Franko (1430m)', 'Planinarski dom Trebević (1187m)', 'Hotel Pino Nature (1070m)'],
    keyHighlights: ['Prirodni izvor Dobre Vode', 'Vapnenačke stijene', 'Endemska crna munika', 'Alpski greben na Sofe'],
    elevationProfile: [
      { distanceKm: 0, elevationM: 1070, label: 'Ravne (Pino)' },
      { distanceKm: 2.2, elevationM: 1190, label: 'Tri budalaša' },
      { distanceKm: 4.5, elevationM: 1310, label: 'Dobre Vode' },
      { distanceKm: 6.8, elevationM: 1430, label: 'Dom Jure Franko' },
      { distanceKm: 8.6, elevationM: 1629, label: 'Vrh Sofe' },
      { distanceKm: 10.4, elevationM: 1070, label: 'Povratak Ravne' },
    ],
    image: '/images/hiking_lodge.jpg',
  },
  {
    id: 'pino-nature-family-loop',
    name: 'Šumska kružna staza: Ravne & Zmajevac',
    subtitle: 'Porodična i rekreativna staza idealna za djecu, početnike i brzo osvježenje',
    distanceKm: 4.2,
    elevationGainM: 110,
    elevationLossM: 110,
    startElevationM: 1070,
    peakElevationM: 1160,
    estimatedHours: 1.3,
    difficulty: 'Lako',
    rating: 4.7,
    reviewCount: 88,
    description: 'Lagana šumska šetnja pogodna za sve uzraste. Uređene staze kroz visoku borovu i smrčevu šumu oko platoa Ravne (1070m n.v.) sa obilaskom vidikovca Zmajevac (1120m n.v.) i šumskog vidikovca na 1160m n.v., sa klupama za odmor i čistim planinskim zrakom.',
    startPoint: 'Hotel Pino Nature (1070m)',
    endPoint: 'Plato Ravne - povratak na Pino',
    waterSources: ['Uređena javna česma Pino (1070m)'],
    mountainHuts: ['Pino Nature Hotel (1070m)', 'Planinarska brvnara'],
    keyHighlights: ['Debela borova hladovina', 'Vidikovac Zmajevac', 'Dječija igrališta i park'],
    elevationProfile: [
      { distanceKm: 0, elevationM: 1070, label: 'Hotel Pino' },
      { distanceKm: 1.4, elevationM: 1120, label: 'Vidikovac Zmajevac' },
      { distanceKm: 2.8, elevationM: 1160, label: 'Gornje Ravne' },
      { distanceKm: 4.2, elevationM: 1070, label: 'Hotel Pino' },
    ],
    image: '/images/gallery_winter.jpg',
  },
];

export const UPCOMING_TOURS: ClubTour[] = [
  {
    id: 'tour-sunrise-sofe',
    title: 'Zimski uspon na Sofe (1629m) - Izlazak sunca nad Sarajevom',
    date: '15. Novembar 2026',
    time: '05:30 h',
    meetingPoint: 'Gornja stanica Trebevićke žičare (Vidikovac)',
    trailName: 'Vrh Sofe (1629m) grebenom',
    difficulty: 'Umjereno',
    durationHours: 4.5,
    guideName: 'Alen Kovačević',
    guideTitle: 'Licencirani planinarski vodič UIAA / GSS spasilac',
    maxParticipants: 35,
    currentRegistered: 28,
    feeBAM: 0,
    requiredGear: ['Planinarske cipele (gojzerice)', 'Topla slojevita odjeća (flis, vjetrovka)', 'Čeona lampa', 'Dereze', 'Topao čaj (1L)'],
    included: ['Vodička služba i sigurnosni protokol', 'Topli planinski čaj u Domu Jure Franko', 'Certifikat o usponu za djecu i mlade'],
    status: 'Zadnja mjesta',
  },
  {
    id: 'tour-olympic-photo',
    title: 'Fotografski safari: Olimpijska bob staza i jesenji Trebević',
    date: '22. Novembar 2026',
    time: '09:00 h',
    meetingPoint: 'Plato ispred hotela Pino Nature',
    trailName: 'Olimpijska bob staza i Čolina Kapa',
    difficulty: 'Lako',
    durationHours: 3.0,
    guideName: 'Selma Hadžić',
    guideTitle: 'Planinarska fotografkinja i vodič PSD Trebević',
    maxParticipants: 25,
    currentRegistered: 14,
    feeBAM: 0,
    requiredGear: ['Fotoaparat ili pametni telefon sa dobrom kamerom', 'Udobne patike za treking', 'Voda i manja užina'],
    included: ['Praktične instrukcije za pejsažnu fotografiju', 'Obilazak svih zavoja bob staze 1984.', 'Pregled arhivskih fotografija sa ZOI 84'],
    status: 'Otvorene prijave',
  },
  {
    id: 'tour-night-stars',
    title: 'Noćni uspon pod zvijezdama i posmatranje sa Čoline Kape',
    date: '05. Decembar 2026',
    time: '18:00 h',
    meetingPoint: 'Izletište Ravne',
    trailName: 'Čolina Kapa Zvjezdarnica',
    difficulty: 'Lako',
    durationHours: 3.5,
    guideName: 'Damir Murtić',
    guideTitle: 'Predsjednik sekcije vodiča PSD Trebević',
    maxParticipants: 40,
    currentRegistered: 39,
    feeBAM: 0,
    requiredGear: ['Čeona lampa (obavezno)', 'Zimska kapa i rukavice', 'Termosica sa toplim napitkom'],
    included: ['Astronomski vodič uz teleskopsko posmatranje', 'Zajedničko druženje uz vatru i planinarske priče'],
    status: 'Zadnja mjesta',
  },
  {
    id: 'tour-spring-school',
    title: 'Proljetna škola planinarstva, čitanja topografskih karti i GPS-a',
    date: '12. April 2027',
    time: '08:30 h',
    meetingPoint: 'Dom Jure Franko',
    trailName: 'Edukativni poligon Trebević',
    difficulty: 'Umjereno',
    durationHours: 6.0,
    guideName: 'Dr. Tarik Begović',
    guideTitle: 'Instruktor planinarstva i kartografije',
    maxParticipants: 30,
    currentRegistered: 12,
    feeBAM: 0,
    requiredGear: ['Kompas', 'Standardna planinarska oprema', 'Blok i olovka za terenske bilješke'],
    included: ['Štampane topografske karte Trebevića M 1:25.000', 'Praktična nastava na stijenama', 'Uvjerenje o završenom modulu'],
    status: 'Otvorene prijave',
  },
];

export const CLUB_NEWS: NewsArticle[] = [
  {
    id: 'news-marking-springs',
    title: 'Završena proljetna obnova markacija i čišćenje izvora Dobre Vode',
    category: 'Održavanje staza',
    date: '28. Oktobar 2026',
    readTime: '3 min čitanja',
    author: 'Markacistička sekcija PSD Trebević',
    summary: 'Naša ekipa volontera obnovila je preko 18 kilometara planinarskih markacija, postavila nove drvene putokaze i očistila korito izvora Dobre Vode.',
    content: [
      'Tokom proteklog vikenda, dvanaest članova markacističke sekcije PSD Trebević provelo je veliku akciju uređenja staza na južnim i zapadnim padinama Trebevića.',
      'Poseban fokus bio je na dionici Vidikovac - Dom Jure Franko - Vrh Sofe. Postavljeno je 24 nova drvena usmjerivača sa označenom nadmorskom visinom i procijenjenim vremenom hoda, u skladu sa standardima Planinarskog saveza Bosne i Hercegovine.',
      'Također je uređeno i temeljito očišćeno prirodno izvorište Dobre Vode, omiljeno stajalište planinara. Voda je mikrobiološki testirana i potpuno ispravna za piće. Zahvaljujemo svim volonterima na uloženom trudu!',
    ],
    image: '/images/hero_summit.jpg',
  },
  {
    id: 'news-memorial-hike',
    title: 'Održan 18. Tradicionalni memorijalni pohod na Trebević sa preko 350 učesnika',
    category: 'Klupski događaji',
    date: '14. Septembar 2026',
    readTime: '4 min čitanja',
    author: 'Upravni odbor PSD Trebević',
    summary: 'Planinari iz Bosne i Hercegovine, Hrvatske, Slovenije i Crne Gore okupili su se u čast osnivača društva i očuvanja prirodnog blaga Sarajeva.',
    content: [
      'Prelijepo sunčano jutro dočekalo je više od 350 planinara na polaznoj tački kod Trebevićke žičare. Pohod je protekao u besprijekornom redu uz podršku Gorske službe spašavanja stanica Sarajevo.',
      'Na platou kod Doma Jure Franko posluženi su tradicionalni planinarski grah i domaći planinski čaj od ubranih trebevićkih trava. Dodijeljene su zahvalnice najmlađem učesniku (7 godina) i najstarijem planinaru (82 godine).',
      'Predsjednik društva istakao je važnost odgovornog boravka u prirodi i principa "Leave No Trace" (Ne ostavljaj trag).',
    ],
    image: '/images/hiking_lodge.jpg',
  },
  {
    id: 'news-cable-car-eco',
    title: 'Ekološki sporazum sa JKP Sarajevo: Popust za planinare uz člansku kartu',
    category: 'Pogodnosti za članove',
    date: '02. Avgust 2026',
    readTime: '2 min čitanja',
    author: 'Sekretarijat PSD Trebević',
    summary: 'Svi aktivni članovi PSD Trebević sa plaćenom markicom za tekuću godinu ostvaruju poseban popust na povratne karte za Trebevićku žičaru.',
    content: [
      'Kako bismo smanjili automobilski saobraćaj prema Trebeviću i zaštitili zaštićeni pejzaž, postignut je dogovor sa upravom Sarajevske žičare.',
      'Pozivamo sve ljubitelje planine da automobile ostave u gradu i na Trebević dolaze ekološki najčišćim prevoznim sredstvom – kultnom žičarom koja za samo 7 minuta stiže sa Bistrika na 1160m nadmorske visine.',
    ],
    image: '/images/bobsleigh.jpg',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-sunrise-sofe',
    title: 'Jutarnja magla nad sarajevskom kotlinom sa Sofe',
    location: 'Vrh Sofe 1629m',
    category: 'Pejzaži',
    photographer: 'Amir M. (PSD Trebević)',
    cameraInfo: 'Sony A7 IV · 24-70mm f/2.8 · ISO 100 · 1/320s',
    aspect: 'landscape',
    src: '/images/hero_summit.jpg',
    description: 'Pogled sa najvišeg vrha Trebevića u trenutku kada se jutarnje sunce probija kroz oblake i otkriva krovove Sarajeva.',
  },
  {
    id: 'gal-bobsleigh-autumn',
    title: 'Olimpijska bob staza u zlatnim bojama jeseni',
    location: 'Zavoj 11, Bob staza 1984',
    category: 'Olimpijska baština',
    photographer: 'Selma H. (PSD Trebević)',
    cameraInfo: 'Canon EOS R6 · 35mm f/1.4 · ISO 200 · 1/500s',
    aspect: 'landscape',
    src: '/images/bobsleigh.jpg',
    description: 'Betonsko korito olimpijske staze utonulo u stoljetnu borovu šumu, simbol sportskog ponosa i trajne historije Sarajeva.',
  },
  {
    id: 'gal-lodge-terrace',
    title: 'Planinarski predah na terasi Doma Jure Franko',
    location: 'Dom Jure Franko (1430m)',
    category: 'Ture & Druženja',
    photographer: 'Damir M. (PSD Trebević)',
    cameraInfo: 'Fujifilm X-T5 · 18-55mm · ISO 160 · 1/250s',
    aspect: 'landscape',
    src: '/images/hiking_lodge.jpg',
    description: 'Planinari uživaju u kafi i pogledu na Sarajevo sa drvene verande kultnog doma nazvanog po olimpijcu Juri Franku.',
  },
  {
    id: 'gal-winter-ridge',
    title: 'Zimski uspon snježnim grebenom',
    location: 'Zapadni greben Trebevića',
    category: 'Zima',
    photographer: 'Alen K. (PSD Trebević)',
    cameraInfo: 'Nikon Z8 · 24-120mm f/4 · ISO 100 · 1/1000s',
    aspect: 'landscape',
    src: '/images/gallery_winter.jpg',
    description: 'Članovi društva u punoj zimskoj opremi gaze prtinu po svježem snijegu pod kristalno plavim dinarskim nebom.',
  },
];

export const HISTORY_MILESTONES = [
  {
    year: '1896.',
    title: 'Prva planinarska kuća i austrougarske staze',
    description: 'Nakon dolaska Austro-Ugarske u BiH, započinje organizovano planinarstvo. Izgrađene su prve staze serpentinama sa Bistrika i sagrađeno prvo sklonište na Trebeviću.',
  },
  {
    year: '1959.',
    title: 'Otvorena prva Trebevićka žičara',
    description: 'Sarajevo dobija prvu kabinsku žičaru dužine 2.064 metra koja je povezala sarajevsku mahalu Bistrik sa Vidikovcem na Trebeviću. Postala je zaštitni znak grada.',
  },
  {
    year: '1984.',
    title: 'XIV Zimske olimpijske igre – Bob i sankaška staza',
    description: 'Izgrađena je jedna od najsavremenijih i najbržih bob staza na svijetu sa 13 zavoja i ukupnim padom od 126 metara. Jure Franko osvaja prvo srebro za Jugoslaviju u veleslalomu.',
  },
  {
    year: '2006.',
    title: 'Osnivanje PSD “Trebević” Sarajevo',
    description: 'Grupa sarajevskih entuzijasta i alpinista osniva Planinarsko-sportsko društvo Trebević sa ciljem obnove planinarske tradicije, markiranja staza i edukacije mladih.',
  },
  {
    year: '2018.',
    title: 'Ponovno oživljavanje Trebevićke žičare',
    description: 'Nakon 26 godina tišine, nova moderna žičara sa 33 gondole u bojama sarajevske olimpijade ponovo je spojila Sarajevo i vrh planine za samo 7 minuta i 15 sekundi.',
  },
  {
    year: 'Danas',
    title: 'Zaštićeni pejzaž i oaza zdravog života',
    description: 'Trebević je proglašen zaštićenim prirodnim područjem, a PSD Trebević brine o sigurnosti planinara, edukaciji, markacijama i očuvanju endemske flore.',
  },
];
