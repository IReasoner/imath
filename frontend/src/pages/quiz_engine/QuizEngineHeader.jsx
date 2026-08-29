import { useNavigate } from "react-router";
import { QuizEngineTimer } from "./QuizEngineTimer";
import imathIcon from "/math_icon.png";

export function QuizEngineHeader({
  question,
  currentIndex,
  timeMs,
  setTimeMs,
  switcher,
  resultNavigator,
}) {
  const navigate = useNavigate();
  const totalQuestion = question.length;
  const currentQuestionNumber = Math.max(
    0,
    Math.min(currentIndex + 1, question.length),
  );

  const progress = (currentIndex / totalQuestion) * 100;

  return (
    <header className="border-b border-gray-200 pb-3">
      <div className="flex items-center justify-between">
        <h1
          className="text-xl font-bold text-green-700 cursor-pointer"
          onClick={() => navigate(switcher)}
        >
          <div className="w-fit flex items-center">
            <img src={imathIcon} alt="imath icon" className="w-6" />
            <span>iMath</span>
          </div>
        </h1>

        <div className="flex items-center gap-5 text-sm">
          <QuizEngineTimer
            timeMs={timeMs}
            setTimeMs={setTimeMs}
            resultNavigator={resultNavigator}
            question={question}
            currentIndex={currentIndex}
          />
          <div className="font-medium text-gray-700">
            Question
            <span className="text-green-700"> {currentQuestionNumber} </span>
            of
            <span className="text-green-700"> {totalQuestion} </span>
          </div>
        </div>
      </div>

      {/* <!-- Progress --> */}

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-green-600"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </header>
  );
}
