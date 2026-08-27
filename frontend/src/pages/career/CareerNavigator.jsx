export function CareerNavigator({ setLevel, stageLevelInfo }) {
  return (
    <div className="flex items-center justify-between">
      {/* <!-- Previous level --> */}

      <button
        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 transition hover:bg-gray-100"
        aria-label="Previous level"
        onClick={() => setLevel(stageLevelInfo.prev_level)}
      >
        ←
      </button>

      {/* <!-- Current level --> */}

      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Current Level
        </p>

        <h2 className="mt-0.5 text-lg font-bold text-green-700">
          Level {stageLevelInfo.level}
        </h2>
      </div>

      {/* <!-- Next level --> */}

      <button
        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 transition hover:bg-gray-100"
        aria-label="Next level"
        onClick={() => setLevel(stageLevelInfo.next_level)}
      >
        →
      </button>
    </div>
  );
}
