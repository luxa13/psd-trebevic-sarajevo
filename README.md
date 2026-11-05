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
3. To enable direct tour registration emails, create a Resend API key, verify the sender domain in Resend, and set `RESEND_API_KEY` and `RESEND_FROM_EMAIL` in `.env.local` and in the production host's server-side environment variables. The recipient is fixed to `psdtrebevic@icloud.com`. Never expose the API key with a `NEXT_PUBLIC_` prefix or commit it.
4. Run the app:
   `npm run dev`

## Deploy to Vercel

Import the project into Vercel from a private GitHub repository. Vercel detects Next.js automatically; use the repository root as the project root and the default build settings. Add any required server-side variables (for example, `GEMINI_API_KEY`, `RESEND_API_KEY`, and `RESEND_FROM_EMAIL`) under the Vercel project's Environment Variables, then redeploy. Do not add secrets to GitHub or expose them as `NEXT_PUBLIC_*`.

The registration form sends only after Resend has a verified sender domain and its API key is configured in the deployment. Without those settings, it displays an error rather than claiming the application was sent.
