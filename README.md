# GlotBridge Landing Page

A beautiful, Duolingo-inspired landing page for GlotBridge - an app that provides live translation over VoIP calls. Built with Next.js 14 and React.

## Features

- 🎨 Duolingo-inspired design with bright, friendly colors
- 📱 Fully responsive design that works on all devices
- ✨ Smooth animations and interactive elements
- 📝 Waitlist signup form with validation
- 🚀 Built with Next.js 14 (App Router)
- ⚡ Fast and optimized with React Server Components

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
voxbridge-web-frontend/
├── app/
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx         # Main page component
│   └── globals.css      # Global styles
├── components/
│   ├── Navbar.tsx       # Navigation component
│   ├── Hero.tsx         # Hero section
│   ├── Features.tsx     # Features grid
│   ├── HowItWorks.tsx   # How it works section
│   ├── Waitlist.tsx    # Waitlist form
│   └── Footer.tsx       # Footer component
├── utils/
│   └── scroll.ts        # Scroll utility functions
├── next.config.js        # Next.js configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

## Customization

### Colors

The color scheme is defined in `app/globals.css` using CSS variables:

```css
--primary-green: #58CC02;      /* Duolingo green */
--secondary-blue: #1CB0F6;     /* Accent blue */
--accent-orange: #FF9500;      /* Accent orange */
```

### Waitlist Form

The waitlist form currently stores submissions in localStorage. To connect it to a backend:

1. Update the `handleSubmit` function in `components/Waitlist.tsx`
2. Replace the simulated API call with an actual fetch to your backend endpoint

Example:
```typescript
const response = await fetch('https://your-api.com/waitlist', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData)
})
const data = await response.json()
```

## Build for Production

```bash
npm run build
npm start
```

## Deploy

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository to Vercel
3. Vercel will automatically detect Next.js and deploy

Or deploy to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
