# InsightEdge

A Next.js application for generating multi-page insights and data visualizations with comprehensive metrics analysis, trend charts, and export capabilities.

## Features

**Dashboard & Analytics**

- Multi-page insights with summary cards (best performers, action items, alerts)
- Interactive data visualizations with Recharts (trends, sparklines, contributor breakdowns)
- Advanced filtering by category, query, and date ranges
- CSV export functionality for external analysis

**Performance & UX**

- Server-side caching with `unstable_cache` and parallel data fetching
- Suspense-based skeleton loaders to eliminate layout shifts
- URL-driven state for shareable filtered views
- Debounced search with `useTransition` for responsive UI
- Error isolation with localized error boundaries
- Dark/light mode with next-themes

**Data Handling**

- Mock data resolvers simulating API calls for metrics, trends, and contributors
- Dynamic aggregation (daily, weekly, monthly)
- Optimized caching with unique keys per filter combination

**Code Quality**

- Full TypeScript coverage with strict type safety
- ESLint, Prettier, Vitest for testing
- Husky pre-commit hooks with lint-staged
- Commitlint for conventional commit standards
- GitHub Actions CI/CD (build, test, lint on develop branch)

## Tech Stack

**Core**: Next.js 16 (App Router), React 19, TypeScript  
**Styling**: Tailwind CSS, Framer Motion  
**Charts**: Recharts, Lucide React  
**Tools**: ESLint, Prettier, Vitest, Husky, GitHub Actions

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

Open [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - ESLint linting
- `npm run test` - Run Vitest tests

## Project Structure

```
app/          # Next.js pages and layouts
lib/          # Utils, data resolvers, types
components/   # Reusable UI components
public/       # Static assets
constants/    # App constants
```

## Key Optimizations

- **Server Caching**: `unstable_cache` with dynamic keys for memoization
- **Parallel Fetching**: `Promise.all` eliminates request waterfalls
- **Bundle Optimization**: Data-heavy components stay server-side
- **Island Architecture**: Selective `"use client"` for minimal JS
- **Image Prefetching**: `next/image` with priority loading
- **Memoized Processing**: `useMemo` for heavy chart computations

## Folder strucutre

```
└── 📁app
    └── 📁(auth)
        └── 📁login
            ├── LoginForm.tsx
            ├── page.tsx
    └── 📁(dashboard)
        └── 📁metrics
            └── 📁_components
                ├── MetricsHeader.tsx
                ├── MetricsSkeleton.tsx
                ├── MetricsSummaryCards.tsx
                ├── MetricsTable.tsx
                ├── MicroTrendChart.tsx
            └── 📁[metricId]
                └── 📁_components
                    ├── ContributorsChart.tsx
                    ├── InsightControls.tsx
                    ├── InsightsSketon.tsx
                    ├── TrendChart.tsx
                ├── loading.tsx
                ├── page.tsx
            ├── error.tsx
            ├── loading.tsx
            ├── page.tsx
        └── 📁settings
            ├── page.tsx
        ├── layout.tsx
    └── 📁components
        └── 📁layout
            ├── Header.tsx
            ├── Sidebar.tsx
        └── 📁ui
            ├── ActionButton.tsx
        ├── ThemeToggle.tsx
    └── 📁constants
        ├── index.ts
    └── 📁contexts
        ├── AuthContext.tsx
    └── 📁providers
        ├── providers.tsx
    ├── error.tsx
    ├── favicon.ico
    ├── globals.css
    ├── layout.tsx
    ├── middleware.ts
    └── page.tsx
```

## Data and Test Files

```
└── 📁lib
    └── 📁data
        ├── mock-data.ts
        ├── resolvers.test.ts
        ├── resolvers.ts
    └── 📁types
        ├── metrics.ts
    └── 📁utils
        ├── exportMetrics.ts
        ├── formatters.ts
        └── utils.ts
```
