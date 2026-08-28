export function QuizEngineFooter({
  currentIndex,
  question,
  resultNavigator,
  isOnline,
}) {
  return (
    <footer className="pt-4">
      <button
        className="h-10 w-full rounded-lg bg-green-600 text-sm font-semibold text-white transition hover:bg-green-700 cursor-pointer"
        onClick={() => {
          if (isOnline) resultNavigator();
        }}
      >
        {currentIndex < question.length ? "Submit Test" : "Finish Test"}
      </button>
    </footer>
  );
}
