# Rolit - Brand & Influencer Platform

A modern platform connecting brands with influencers through AI-powered matching.

## Tech Stack

- React 18
- TypeScript
- Vite
- TailwindCSS
- React Router
- Framer Motion
- React Query
- Supabase/Firebase

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Vercel Deployment Instructions

This project is optimized for deployment on Vercel. Follow these steps to deploy:

### Option 1: Deploy via Vercel CLI

1. Install the Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy the project:
```bash
vercel
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to a GitHub, GitLab, or Bitbucket repository.

2. Go to [Vercel Dashboard](https://vercel.com/dashboard).

3. Click "New Project" and import your repository.

4. Configure the project:
   - Root Directory: `FrontEnd`
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. Click "Deploy" and your application will be live in minutes!

## Environment Variables

The following environment variables should be configured in your Vercel project:

```
VITE_API_URL=your_api_url
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Project Structure

```
FrontEnd/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── assets/           # Images, fonts, etc.
│   ├── animations.css    # Animation styles
│   └── main.tsx          # App entry point
├── .nvmrc                # Node version
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── vercel.json           # Vercel deployment configuration
``` 