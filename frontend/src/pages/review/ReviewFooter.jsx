export function ReviewFooter({ page, setPage, filteredQuestion }) {
  const allPages = Math.ceil(filteredQuestion.length / 6);
  return (
    <footer className="border-t border-gray-200 bg-white px-4 py-3">
      <div className="flex items-center justify-between">
        <button
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100"
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
        >
          ← Previous
        </button>

        <p className="text-sm font-medium text-gray-600">
          Page <span className="text-green-700 font-semibold">{page}</span> of{" "}
          <span className="font-semibold">{allPages}</span>
        </p>

        <button
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100"
          onClick={() => {
            if (page < allPages) {
              setPage(page + 1);
            }
          }}
        >
          Next →
        </button>
      </div>
    </footer>
  );
}
