import { useEffect } from "react";
import { useNavigate } from "react-router";

export function ChallengeResultPage({ question }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!question) {
      navigate("/");
    }

    /* eslint-disable */
  }, []);

  if (!question) {
    return null;
  }

  // i can later use filter to get the length of the number instead of use forEach

  let isCorrect = 0;
  let isWrong = 0;
  let notAttempt = 0;
  const totalQuestion = question.length;

  question.forEach((question) => {
    if (question.is_correct) {
      isCorrect += 1;
    }

    if (question.user_answer && !question.is_correct) {
      isWrong += 1;
    }

    if (!question.is_corrent && !question.user_answer) {
      notAttempt += 1;
    }
  });
  return (
    <div className="bg-gray-50">
      <div className="mx-auto flex h-dvh max-w-md flex-col justify-center px-4">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          {/* <!-- Icon --> */}

          <div className="text-center text-5xl">🎉</div>

          {/* <!-- Title --> */}

          <h1 className="mt-3 text-center text-2xl font-bold text-gray-900">
            Challenge Complete
          </h1>

          <p className="mt-1 text-center text-sm text-gray-500">
            Here is your performance summary.
          </p>

          {/* <!-- Score --> */}

          <div className="mt-6 rounded-lg bg-green-50 py-4 text-center">
            <p className="text-sm text-gray-600">Your Score</p>

            <h2 className="mt-1 text-4xl font-bold text-green-700">
              {`${isCorrect} / ${totalQuestion}`}
            </h2>
          </div>

          {/* <!-- Statistics --> */}

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center">
              <p className="text-xs text-gray-600">Correct</p>

              <h3 className="mt-1 text-2xl font-bold text-green-700">
                {isCorrect}
              </h3>
            </div>

            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
              <p className="text-xs text-gray-600">Incorrect</p>

              <h3 className="mt-1 text-2xl font-bold text-red-600">
                {isWrong}
              </h3>
            </div>
          </div>

          {/* <!-- Not Attempted --> */}

          <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Not Attempted
              </span>

              <span className="font-semibold text-gray-900">{notAttempt}</span>
            </div>
          </div>

          {/* <!-- Buttons --> */}

          <div className="mt-6 space-y-3">
            <button
              className="h-10 w-full rounded-lg bg-green-600 text-sm font-semibold text-white transition hover:bg-green-700"
              onClick={() => navigate("/review")}
            >
              Review Answers
            </button>

            <button
              className="h-10 w-full rounded-lg border border-gray-300 bg-white text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
              onClick={() => navigate("/")}
            >
              Back Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
