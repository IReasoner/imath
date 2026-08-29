import loadingIcon from "../../assets/loading.png";
export function QuizEngineFooter({
  currentIndex,
  question,
  resultNavigator,
  isOnline,
  isLoading,
}) {
  return (
    <footer className="pt-4">
      <button
        disabled={isLoading}
        className="h-10 w-full rounded-lg bg-green-600 text-sm font-semibold text-white transition hover:bg-green-700 cursor-pointer disabled:cursor-wait disabled:opacity-70 disabled:hover:bg-green-600"
        onClick={() => {
          if (isOnline) resultNavigator();
        }}
      >
        {isLoading ? (
          <div className="w-full flex items-center justify-center">
            <img src={loadingIcon} className="w-6 animate-spin" />
          </div>
        ) : currentIndex < question.length ? (
          "Submit Test"
        ) : (
          "Finish Test"
        )}
      </button>
    </footer>
  );
}
