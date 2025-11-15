// app/(protected)/todo/components/TodoEmptyState.tsx

export default function TodoEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Illustration */}
      <div className="relative w-64 h-64 mb-6">
        {/* Background Cards */}
        <div className="absolute top-0 left-8 w-48 h-56 bg-gray-100 border-2 border-gray-300 rounded-xl transform -rotate-6 opacity-70">
          <div className="p-4 space-y-3">
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
          </div>
        </div>

        {/* Front Card */}
        <div className="absolute top-4 left-12 w-48 h-56 bg-white border-2 border-gray-300 rounded-xl shadow-lg transform rotate-3">
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded"></div>
              <div className="flex-1 space-y-1">
                <div className="h-2 bg-gray-300 rounded"></div>
                <div className="h-2 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-300 rounded"></div>
              <div className="flex-1 space-y-1">
                <div className="h-2 bg-gray-300 rounded"></div>
                <div className="h-2 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-300 rounded"></div>
              <div className="flex-1 space-y-1">
                <div className="h-2 bg-gray-300 rounded"></div>
                <div className="h-2 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Plus Icon */}
        <div className="absolute bottom-0 right-8 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
      </div>

      {/* Text */}
      <p className="text-2xl font-normal text-[#201F1E]">No todos yet</p>
    </div>
  );
}