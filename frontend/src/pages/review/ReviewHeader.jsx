import { useEffect } from "react";
import { useNavigate } from "react-router";
import imathIcon from "/math_icon.png";

export function ReviewHeader({ question, setFilter, filter, switcher }) {
  const navigate = useNavigate();

  // Question number
  const atemptedQuestionNumber = question.filter(
    (question) => question.user_answer,
  ).length;

  const correctQuestionNumber = question.filter(
    (question) => question.is_correct,
  ).length;
  const inCorrectQuestionNumber = question.filter(
    (question) => !question.is_correct && question.user_answer,
  ).length;
  const notAttemtedQuestionNumber = question.filter(
    (question) => !question.is_correct && !question.user_answer,
  ).length;

  useEffect(() => {
    if (filter) return;

    if (atemptedQuestionNumber > 0) {
      setFilter("attempted");
    } else if (correctQuestionNumber > 0) {
      setFilter("correct");
    } else if (inCorrectQuestionNumber > 0) {
      setFilter("incorrect");
    } else if (notAttemtedQuestionNumber > 0) {
      setFilter("notAttempted");
    }

    /* eslint-disable */
  }, []);

  // Active and not active style
  const commonStyle = "whitespace-nowrap rounded-full px-4 py-1.5 text-sm";
  const notActive =
    "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100";
  const active = "font-medium text-white bg-green-600";

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between px-4 py-3">
        <h1
          className="text-xl font-bold text-green-700 cursor-pointer"
          onClick={() => navigate(switcher)}
        >
          <div className="w-fit flex items-center">
            <img src={imathIcon} alt="imath icon" className="w-6" />
            <span>iMath</span>
          </div>
        </h1>

        <span className="text-sm font-semibold text-gray-700">
          Review Answers
        </span>
      </div>

      {/* <!-- Filters --> */}

      <div className="flex gap-2 overflow-x-auto px-4 pb-3">
        <div className="whitespace-nowrap rounded-full bg-gray-100 px-4 py-1.5 text-sm font-semibold text-gray-700">
          All <span className="text-gray-900">({question.length})</span>
        </div>
        {atemptedQuestionNumber > 0 && (
          <button
            className={`${commonStyle} ${filter === "attempted" ? active : notActive}`}
            onClick={() => setFilter("attempted")}
          >
            Attempted ({atemptedQuestionNumber})
          </button>
        )}

        {correctQuestionNumber > 0 && (
          <button
            className={`${commonStyle} ${filter === "correct" ? active : notActive}`}
            onClick={() => setFilter("correct")}
          >
            Correct ({correctQuestionNumber})
          </button>
        )}

        {inCorrectQuestionNumber > 0 && (
          <button
            className={`${commonStyle} ${filter === "incorrect" ? active : notActive}`}
            onClick={() => setFilter("incorrect")}
          >
            Incorrect ({inCorrectQuestionNumber})
          </button>
        )}

        {notAttemtedQuestionNumber > 0 && (
          <button
            className={`${commonStyle} ${filter === "notAttempted" ? active : notActive}`}
            onClick={() => setFilter("notAttempted")}
          >
            Not Attempted ({notAttemtedQuestionNumber})
          </button>
        )}
      </div>
    </header>
  );
}
