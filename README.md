<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/ee2e9817-2be5-4e99-b6d8-e69ca22c74c4

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. To enable direct tour registration emails without a custom domain, use a Gmail account as the sender. Turn on 2-Step Verification, create a Google [App Password](https://support.google.com/accounts/answer/185833), and set `GMAIL_USER` to that account and `GMAIL_APP_PASSWORD` to the generated password in `.env.local` and the production host's server-side environment variables. The recipient is fixed to `psdtrebevic@icloud.com`; replies go to the applicant. Never use your regular Google password, expose these values with a `NEXT_PUBLIC_` prefix, or commit them.
4. Run the app:
   `npm run dev`

## Deploy to Vercel

Import the project into Vercel from a private GitHub repository. Vercel detects Next.js automatically; use the repository root as the project root and the default build settings. Add any required server-side variables (for example, `GEMINI_API_KEY`, `GMAIL_USER`, and `GMAIL_APP_PASSWORD`) under the Vercel project's Environment Variables, then redeploy. Do not add secrets to GitHub or expose them as `NEXT_PUBLIC_*`.

The registration form sends through Gmail SMTP over TLS. The sender is the configured Gmail account, and the recipient remains `psdtrebevic@icloud.com`. Without the required Gmail settings, the form displays an error rather than claiming the application was sent.
