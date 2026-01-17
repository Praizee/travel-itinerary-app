# Travel Itinerary App

A production-grade travel itinerary web application built with Next.js 16, featuring flight, hotel, and activity management with a beautiful, responsive UI.

![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## Features

- **Itinerary Management** - Create, edit, and manage travel itineraries with flights, hotels, and activities
- **Search Integration** - Search for flights, hotels, and activities via RapidAPI integrations
- **Persistent Storage** - Itineraries are saved to localStorage and persist across sessions
- **Responsive Design** - Fully responsive UI that works on desktop, tablet, and mobile
- **Animations** - Smooth animations with Framer Motion and reduced motion support
- **Type Safety** - Full TypeScript support with strict mode enabled
- **Form Validation** - React Hook Form with Zod schema validation

## Tech Stack

| Category             | Technology                      |
| -------------------- | ------------------------------- |
| **Framework**        | Next.js 16 (App Router)         |
| **Language**         | TypeScript (strict mode)        |
| **Styling**          | Tailwind CSS 4                  |
| **State Management** | Zustand with persist middleware |
| **Data Fetching**    | TanStack Query (React Query)    |
| **HTTP Client**      | Axios                           |
| **Forms**            | React Hook Form + Zod           |
| **Animations**       | Framer Motion                   |
| **Notifications**    | Sonner                          |
| **Icons**            | Lucide React (and custom SVGs)  |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API route handlers
│   │   ├── flights/search/
│   │   ├── hotels/search/
│   │   └── activities/search/
│   ├── activities/        # Activities search page
│   ├── commission/        # Commission page (placeholder)
│   ├── dashboard/         # Dashboard page (placeholder)
│   ├── flights/           # Flights search page
│   ├── hotels/            # Hotels search page
│   ├── plan/              # Plan trip page (placeholder)
│   ├── wallet/            # Wallet page (placeholder)
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page (itinerary view)
│   └── globals.css        # Global styles & Tailwind config
├── components/
│   ├── itinerary/         # Itinerary-specific components
│   │   ├── flight-card.tsx
│   │   ├── hotel-card.tsx
│   │   ├── activity-card.tsx
│   │   ├── itinerary-header.tsx
│   │   └── itinerary-sections.tsx
│   ├── layout/            # Layout components
│   │   ├── sidebar.tsx
│   │   ├── top-nav.tsx
│   │   └── shell-layout.tsx
│   ├── search/            # Search form components
│   │   ├── flight-search-form.tsx
│   │   ├── hotel-search-form.tsx
│   │   ├── activity-search-form.tsx
│   │   └── search-results.tsx
│   └── ui/                # Reusable UI components
│       ├── button.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── card.tsx
│       ├── modal.tsx
│       ├── badge.tsx
│       ├── spinner.tsx
│       └── empty-state.tsx
├── hooks/                 # Custom React hooks
│   ├── use-search-flights.ts
│   ├── use-search-hotels.ts
│   ├── use-search-activities.ts
│   ├── use-itinerary-mutations.ts
│   └── use-debounce.ts
├── lib/
│   ├── api/               # API client & normalizers
│   │   ├── api-client.ts
│   │   └── normalizers.ts
│   ├── schemas/           # Zod validation schemas
│   │   ├── flight.schema.ts
│   │   ├── hotel.schema.ts
│   │   └── activity.schema.ts
│   └── utils.ts           # Utility functions
├── providers/             # React context providers
│   ├── query-provider.tsx
│   ├── toast-provider.tsx
│   └── motion-provider.tsx
├── store/                 # Zustand stores
│   ├── itinerary-store.ts
│   └── ui-store.ts
└── types/                 # TypeScript type definitions
    ├── domain.ts          # Domain models
    └── api.ts             # API types
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Praizee/travel-itinerary-app.git
   cd travel-itinerary-app
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

4. **Configure your RapidAPI key**

   Edit `.env.local` and add your RapidAPI key:

   ```env
   RAPIDAPI_KEY=your_rapidapi_key_here
   ```

5. **Run the development server**

   ```bash
   pnpm dev
   ```

6. **Open the app**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable       | Description                                                | Required |
| -------------- | ---------------------------------------------------------- | -------- |
| `RAPIDAPI_KEY` | Your RapidAPI key for flight, hotel, and activity searches | Yes      |

## Available Scripts

| Command      | Description                             |
| ------------ | --------------------------------------- |
| `pnpm dev`   | Start development server with Turbopack |
| `pnpm build` | Build for production                    |
| `pnpm start` | Start production server                 |
| `pnpm lint`  | Run ESLint                              |

## API Routes

All API routes are server-side only to protect the RapidAPI key.

### Flights Search

```
POST /api/flights/search
```

**Request Body:**

```json
{
  "origin": "JFK",
  "destination": "LAX",
  "departureDate": "2026-02-15",
  "returnDate": "2026-02-22",
  "adults": 1,
  "cabinClass": "economy"
}
```

### Hotels Search

```
POST /api/hotels/search
```

**Request Body:**

```json
{
  "destination": "Los Angeles",
  "checkInDate": "2026-02-15",
  "checkOutDate": "2026-02-22",
  "adults": 2,
  "rooms": 1
}
```

### Activities Search

```
POST /api/activities/search
```

**Request Body:**

```json
{
  "destination": "Los Angeles",
  "date": "2026-02-15",
  "category": "tours"
}
```

## Architecture

### State Management

- **Zustand** is used for global state management with two stores:
  - `itinerary-store`: Manages itineraries, flights, hotels, and activities with localStorage persistence
  - `ui-store`: Manages UI state like sidebar toggle and modal visibility

### Data Fetching

- **TanStack Query** handles all server state with:
  - Automatic caching (5-minute stale time)
  - Background refetching
  - Optimistic updates for mutations
  - Error handling and retry logic

### API Layer

- All external API calls go through Next.js API routes to protect API keys
- Normalizers transform external API responses into consistent domain models
- Zod schemas validate all incoming data

### Component Architecture

- **UI Components**: Reusable, stateless components (Button, Input, Card, etc.)
- **Layout Components**: Page structure components (Sidebar, TopNav, ShellLayout)
- **Feature Components**: Domain-specific components (FlightCard, HotelCard, etc.)

## Design System

The app uses a custom design system with Tailwind CSS 4:

### Colors

| Token           | Usage                      |
| --------------- | -------------------------- |
| `primary-*`     | Primary brand color (blue) |
| `neutral-*`     | Grays and backgrounds      |
| `error-*`       | Error states               |
| `black-primary` | Primary text color         |

### Spacing

Uses Tailwind's default spacing scale with custom additions:

- `left-55` / `ml-55`: 220px (sidebar width expanded)
- `left-18` / `ml-18`: 72px (sidebar width collapsed)

<!-- ## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Zustand](https://zustand-demo.pmnd.rs/) - Bear necessities for state management
- [TanStack Query](https://tanstack.com/query) - Powerful data synchronization
- [Framer Motion](https://www.framer.com/motion/) - Production-ready animations
- [Lucide](https://lucide.dev/) - Beautiful & consistent icons -->

