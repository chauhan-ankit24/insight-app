# InsightEdge

A Next.js application for generating multi-page insights and data visualizations with comprehensive metrics analysis, trend charts, and export capabilities.

## Getting Started

```bash
# Clone the repository
git clone https://github.com/chauhan-ankit24/insight-app.git
cd insight-app

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# ESLint linting
npm run lint
```

Open [http://localhost:3000](http://localhost:3000)

## ⚠️ Development Notice: Error Testing

This project currently includes **intentional API failure points** to test resilience, Error Boundaries, `error.tsx` and the `not-found.tsx` logic.

## Tech Stack

| Category                  | Technology                  | Version  |
| ------------------------- | --------------------------- | -------- |
| **Core Technologies**     | Next.js (App Router)        | 16.1.1   |
|                           | React                       | 19.2.3   |
|                           | TypeScript                  | 5        |
| **Styling & Animation**   | Tailwind CSS                | 3.4.0    |
|                           | Framer Motion               | 12.23.26 |
|                           | next-themes                 | 0.4.6    |
| **Charts & Icons**        | Recharts                    | 3.6.0    |
|                           | Lucide React                | 0.562.0  |
| **Development Tools**     | ESLint                      | 9        |
|                           | Prettier                    | 3.7.4    |
|                           | Vitest                      | 4.0.16   |
|                           | Husky                       | 9.1.7    |
|                           | lint-staged                 | 16.2.7   |
|                           | Commitlint                  | 20.2.0   |
|                           | GitHub Actions              | -        |
| **Build & Configuration** | PostCSS                     | 8.5.0    |
|                           | Autoprefixer                | 10.4.20  |
|                           | Vite (@vitejs/plugin-react) | 5.1.2    |

## Features

## User Experience & Analytics

- **Executive Insights**: High-level summary cards highlighting top performers, action items, and critical alerts.
- **Interactive Visuals**: Rich data storytelling using Recharts for deep-dive trends and contributor breakdowns.
- **Precision Filtering**: Advanced search by category and date range, synchronized with the **URL-state** for instant sharing.
- **Data Portability**: Integrated CSV export functionality for offline reporting and external analysis.
- **Seamless UI**: Adaptive Dark/Light modes with `next-themes` and responsive layouts for all devices.

## Performance & Core Optimizations

- **Parallel Fetching**: Waterfall elimination via `Promise.all` orchestration.
- **Server Caching**: Granular `unstable_cache` with parameter-unique keys.
- **Island Architecture**: Selective `"use client"` boundaries for minimal JS payload.
- **Zero-CLS Loading**: Suspense-integrated **Skeleton Loaders** for layout stability.
- **URL-Sync State**: Persistent filter/search state via native URL query parameters.
- **Fluid Transitions**: Debounced search powered by `useTransition` for UI responsiveness.
- **Fault Isolation**: Localized **Error Boundaries** for graceful failure handling.
- **Memoized Processing**: `useMemo` optimization for complex SVG chart computations.
- **Direct Utility Styling**: Configuration-free Tailwind arbitrary values for reliable rendering.
- **Bundle Auditing**: Automated CI-integrated monitoring via `@next/bundle-analyzer`.
- **Tag-Based Invalidation**: Targeted cache clearing via Next.js on-demand revalidation.

## Data Intelligence & Resilience

- **Failure Injection**: Mock APIs with $500-1000$ms latency and $10\%$ failure rates for stress-testing.
- **Time-Grain Logic**: Dynamic grouping (Daily/Weekly/Monthly) with intelligent data sampling.
- **URL-State Search**: Search and multi-filter logic synced directly with browser query params.
- **Granular Caching**: Parameter-unique `unstable_cache` keys with tag-based invalidation.
- **Synthetic Realism**: Data engine mimicking real-world volatility, biases, and business spikes.

## Code Quality & Standards

- **Type Safety**: 100% TypeScript coverage with strict mode enabled.
- **Architectural Pattern**: Hybrid RSC (React Server Components) architecture for optimal performance.
- **Testing Suite**:
  - **Unit**: Vitest for utility logic and data resolvers.
- **Automation**:
  - **Husky**: Pre-commit hooks for linting and type-checking via `lint-staged`.
  - **Commitlint**: Enforcement of [Conventional Commits](https://www.conventionalcommits.org/).
- **Performance**: Automated bundle analysis and image optimization via Next.js `next/image`.

## **CI/CD**: GitHub Actions for automated build, test, and linting on every PR.

<img width="1009" height="348" alt="image" src="https://github.com/user-attachments/assets/111580e8-007f-4b4a-8f0c-a1fc965c1b07" />

## Labeled Directory Tree

#### App Directory

```
└── 📁app
    └── 📁(auth)
        └── 📁login
            ├── 🟢 [Client] LoginForm.tsx
            ├── 🔴 [Server] page.tsx
    └── 📁(dashboard)
        └── 📁metrics
            └── 📁_components
                ├── 🟢 [Client] MetricsHeader.tsx
                ├── 🟢 [Client] MetricsSkeleton.tsx
                ├── 🔴 [Server] MetricsSummaryCards.tsx
                ├── 🔴 [Server] MetricsTable.tsx
                ├── 🟢 [Client] MicroTrendChart.tsx
            └── 📁[metricId]
                └── 📁_components
                    ├── 🟢 [Client] ContributorsChart.tsx
                    ├── 🟢 [Client] InsightControls.tsx
                    ├── 🟢 [Client] InsightsSketon.tsx
                    ├── 🟢 [Client] TrendChart.tsx
                ├── 🟢 [Client] loading.tsx
                ├── 🔴 [Server] page.tsx
            ├── 🟢 [Client] error.tsx
            ├── 🟢 [Client] loading.tsx
            ├── 🔴 [Server] page.tsx
        └── 📁settings
            ├── 🔴 [Server] page.tsx
        ├── 🔴 [Server] layout.tsx
    └── 📁components
        └── 📁layout
            ├── 🟢 [Client] Header.tsx
            ├── 🟢 [Client] Sidebar.tsx
        └── 📁ui
            ├── 🟢 [Client] ActionButton.tsx
        ├── 🟢 [Client] ThemeToggle.tsx
    └── 📁constants
        ├── [Utility] index.ts
        ├── [Utility] routes.ts
        ├── [Utility] seo.ts
    └── 📁contexts
        ├── 🟢 [Client] AuthContext.tsx
    └── 📁providers
        ├── 🟢 [Client] providers.tsx
    ├── 🔴 [Server] error.tsx
    ├── [Asset] favicon.ico
    ├── [Styles] globals.css
    ├── 🔴 [Server] layout.tsx
    ├── 🔴 [Server] middleware.ts
    ├── 🔴 [Server] not-found.tsx
    ├── 🔴 [Server] page.tsx
    ├── 🔴 [Server] robots.ts
    └── 🔴 [Server] sitemap.ts
```

#### Lib Directory

```
└── 📁lib
    └── 📁data
        ├── [Utility] config.ts
        ├── [Utility] mock-data.ts
        ├── [Utility] resolvers.test.ts
        ├── 🔴 [Server] resolvers.ts
    └── 📁types
        ├── [Utility] metrics.ts
    └── 📁utils
        ├── 🔴 [Server] exportMetrics.ts
        ├── [Utility] formatters.ts
        ├── [Utility] metrics-utils.ts
        ├── [Utility] style-utils.ts
        └── [Utility] utils.ts
```
