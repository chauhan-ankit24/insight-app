import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8 dark:bg-gray-900">
      <div className="max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          Multi-Page Insights App
        </h1>
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
          An application for generating and viewing multi-page insights and data visualizations.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/metrics"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
          >
            View Metrics
          </Link>
        </div>
      </div>
    </div>
  );
}
