export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="animate-pulse">
        <div className="mb-2 h-8 w-1/4 rounded bg-gray-300"></div>
        <div className="mb-4 h-6 w-1/6 rounded bg-gray-300"></div>
        <div className="h-4 w-1/3 rounded bg-gray-300"></div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="animate-pulse rounded-lg border p-4">
          <div className="mb-4 h-6 w-1/4 rounded bg-gray-300"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 w-1/4 rounded bg-gray-300"></div>
                <div className="h-4 w-1/6 rounded bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-pulse rounded-lg border p-4">
          <div className="mb-4 h-6 w-1/4 rounded bg-gray-300"></div>
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 w-1/3 rounded bg-gray-300"></div>
                <div className="h-4 w-1/6 rounded bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
