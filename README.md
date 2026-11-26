This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## MyTelc AI Assistant

The floating TELC B1 assistant uses the OpenAI Chat Completions API from a server route. Copy `.env.example` to `.env.local`, set `OPENAI_API_KEY` there, and restart the development server. The key stays server-side and must not be added to client code or committed. `OPENAI_MODEL` is optional and defaults to `gpt-4o-mini`.

## Local registrations and admin dashboard

The registration form saves each name, e-mail address, and registration date in the current browser's `localStorage`; it does not store the submitted password or require a server. `/admin` reads and manages those local entries with the password `MyTelc2026`. This is a local convenience feature, not secure authentication: the password is included in client code, and entries are only available in the same browser and device. They are not synced with Supabase or other users' devices.

Tasribat experiences are stored in the publishing browser's `localStorage` and remain available there after refresh. They are not shared between different browsers or devices.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
