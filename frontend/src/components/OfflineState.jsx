export function OfflineState({ setConnectionStatus }) {
  return (
    <div className="fixed inset-x-0 top-2 z-50 border border-red-200 bg-white shadow-sm w-125 mx-auto">
      <div className="mx-auto flex min-h-12 max-w-5xl items-center justify-between gap-3 px-4 py-2">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
            !
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900">
              You're offline
            </p>

            <p className="truncate text-xs text-gray-500">
              Check your internet connection. Some features may be unavailable.
            </p>
          </div>
        </div>

        <button
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          aria-label="Dismiss offline notification"
          onClick={() => setConnectionStatus(null)}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
