# InsightEdge

An application for generating and viewing multi-page insights and data visualizations. Built with Next.js, this app provides a comprehensive dashboard for metrics analysis, including trend charts, contributor data, and export functionalities.

## Features

### Core Functionality

- **Multi-Page Insights Dashboard**: Navigate through various pages including landing, authentication, and dashboard views.
- **Metrics Management**: View, filter, and analyze metrics with real-time data fetching and caching.
- **Summary Cards**: Highlight key metrics such as best performers, action-required items, and needs-attention alerts.
- **Data Visualization**: Interactive charts and graphs using Recharts for trend analysis, sparklines, and contributor breakdowns.
- **Export Capabilities**: Generate and download metrics data as CSV files for external analysis.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS, ensuring compatibility across devices.

### User Experience Enhancements

- **Theme Toggle**: Dark and light mode support with next-themes for personalized viewing.
- **Smooth Animations**: Framer Motion integration for fluid transitions and interactive elements.
- **Authentication Context**: Secure user sessions with React Context for auth state management.
- **Error Handling**: Custom error pages and middleware for robust application stability.

### Data Handling

- **Caching**: Optimized data fetching with Next.js unstable_cache for improved performance.
- **Mock Data Simulation**: Realistic data resolvers simulating API calls for metrics, trends, and contributors.
- **Filtering and Search**: Advanced filtering by category, query, and date ranges for metrics tables.
- **Dynamic Data Aggregation**: Support for daily, weekly, and monthly trend aggregations.

### Development and Quality Assurance

- **TypeScript**: Full type safety with TypeScript for reliable code.
- **Linting and Formatting**: ESLint and Prettier for code quality, with lint-staged for pre-commit checks.
- **Testing**: Vitest for unit testing, including data resolvers and utilities.
- **Commit Standards**: Commitlint with conventional commits for consistent git history.
- **CI/CD**: GitHub Actions workflow for automated building, testing, and linting on pushes and PRs to the develop branch.

### Additional Enhancements

- **Modern UI Components**: Reusable components like ActionButton and layout elements (Header, Sidebar).
- **Font Optimization**: Geist font family loaded via next/font for performance.
- **Middleware Support**: Custom middleware for request handling and routing.
- **SEO Optimization**: Metadata configuration for better search engine visibility.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS, PostCSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Theming**: next-themes
- **Development Tools**: ESLint, Prettier, Vitest, Husky, Lint-staged, Commitlint
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js 24 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd insight-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting
- `npm run test` - Run Vitest for testing
- `npm run prepare` - Set up Husky for git hooks

## Usage

1. **Landing Page**: Access the main entry point at the root URL.
2. **Authentication**: Use the auth context for user login/logout (implementation depends on your auth provider).
3. **Dashboard**: Navigate to `/metrics` to view the full dashboard with:
   - Summary cards showing key metrics
   - Filterable metrics table
   - Trend charts and contributor data
4. **Export**: Use the export functionality to download metrics as CSV.
5. **Theme Toggle**: Switch between light and dark modes using the theme toggle component.

## Development

### Project Structure

- `app/` - Next.js app directory with pages and layouts
- `lib/` - Utility functions, data resolvers, and types
- `components/` - Reusable UI components
- `public/` - Static assets
- `constants/` - Application constants

### Code Quality

- Pre-commit hooks ensure code is linted and formatted
- Tests are run automatically in CI
- Commit messages follow conventional commit standards

### Contributing

1. Fork the repository
2. Create a feature branch from `develop`
3. Make your changes
4. Ensure tests pass and code is linted
5. Submit a pull request

## Deployment

Deploy to Vercel or any platform supporting Next.js:

1. Build the application:

   ```bash
   npm run build
   ```

2. Deploy the `.next` folder and required files.

For Vercel-specific deployment, check [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).

## License

This project is private and not licensed for public use.
