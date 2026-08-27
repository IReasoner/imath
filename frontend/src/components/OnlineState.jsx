export function OnlineState() {
  return (
    <div className="fixed inset-x-0 top-2 z-50 border border-green-200 bg-white shadow-sm w-125 mx-auto">
      <div className="mx-auto flex min-h-12 max-w-5xl items-center gap-3 px-4 py-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
          ✓
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-900">
            You're back online
          </p>

          <p className="text-xs text-gray-500">
            Your internet connection has been restored.
          </p>
        </div>
      </div>
    </div>
  );
}
