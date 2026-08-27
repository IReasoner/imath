import { useEffect } from "react";

export function ReviewMain({
  question,
  filter,
  page,
  setPage,
  filteredQuestion,
  setFilteredQuestion,
}) {
  useEffect(() => {
    if (filter === null) return;
    if (filter === "attempted") {
      const attemptedFilter = question.filter((question) => {
        return question.user_answer;
      });

      setFilteredQuestion(attemptedFilter);
      setPage(1);
    } else if (filter === "correct") {
      const correctFilter = question.filter((question) => {
        return question.is_correct;
      });

      setFilteredQuestion(correctFilter);
      setPage(1);
    } else if (filter === "incorrect") {
      const inCorrectFilter = question.filter((question) => {
        return !question.is_correct && question.user_answer;
      });

      setFilteredQuestion(inCorrectFilter);
      setPage(1);
    } else if (filter === "notAttempted") {
      const notAttemptedFilter = question.filter((question) => {
        return !question.is_correct && !question.user_answer;
      });

      setFilteredQuestion(notAttemptedFilter);
      setPage(1);
    }

    /* eslint-disable */
  }, [filter]);

  if (!filteredQuestion) return null;

  const limit = 6;
  const start = (page - 1) * limit;
  const end = start + limit;

  // slice, start = the first position if the string or array, "hope"
  // 0 mean start from h, then end mean stopping value, 1 end means
  // start from h and end o, that mean we will get only h
  const perPageQuestion = filteredQuestion.slice(start, end);

  return (
    <main className="flex-1 overflow-y-auto p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* <!-- Correct --> */}

        {perPageQuestion.map((question) => {
          if (question.is_correct) {
            return (
              <div
                key={question.index}
                className="rounded-xl border border-green-200 bg-white p-4 shadow-sm"
              >
                {/* <!-- Header --> */}
                <div className="flex items-center justify-between">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-xs font-semibold text-green-700">
                    {question.index}
                  </div>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    ✓ Correct
                  </span>
                </div>

                {/* <!-- Question --> */}
                <div className="py-6">
                  <p className="text-center text-2xl font-bold tracking-wide text-gray-900">
                    {question.question}
                  </p>
                </div>

                {/* <!-- Answer --> */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-sm">
                  <span className="text-gray-500"> Your Answer </span>

                  <span className="font-semibold text-green-700">
                    {" "}
                    {question.user_answer}{" "}
                  </span>
                </div>
              </div>
            );
          }

          if (!question.is_correct && question.user_answer) {
            return (
              <div
                key={question.index}
                className="rounded-xl border border-red-200 bg-white p-4 shadow-sm"
              >
                {/* <!-- Header --> */}
                <div className="flex items-center justify-between">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-xs font-semibold text-red-600">
                    {question.index}
                  </div>

                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-600">
                    ✗ Incorrect
                  </span>
                </div>

                {/* <!-- Question --> */}
                <div className="py-6">
                  <p className="text-center text-2xl font-bold tracking-wide text-gray-900">
                    {question.question}
                  </p>
                </div>

                {/* <!-- Answers -->  */}
                <div className="space-y-2 border-t border-gray-100 pt-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500"> Your Answer </span>

                    <span className="font-semibold text-red-600">
                      {" "}
                      {question.user_answer}{" "}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500"> Correct Answer </span>

                    <span className="font-semibold text-green-700">
                      {" "}
                      {question.answer}{" "}
                    </span>
                  </div>
                </div>
              </div>
            );
          }

          if (!question.is_correct && !question.user_answer) {
            return (
              <div
                key={question.index}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                {/* <!-- Header --> */}
                <div className="flex items-center justify-between">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600">
                    {question.index}
                  </div>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                    ○ Not Attempted
                  </span>
                </div>

                {/* <!-- Question --> */}
                <div className="py-7">
                  <p className="text-center text-2xl font-bold tracking-wide text-gray-900">
                    {question.question}
                  </p>
                </div>
              </div>
            );
          }
        })}
      </div>
    </main>
  );
}
