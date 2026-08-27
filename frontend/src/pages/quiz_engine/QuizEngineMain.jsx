import { useState } from "react";

export function QuizEngineMain({
  question,
  setQuestion,
  currentIndex,
  setCurrentIndex,
}) {
  const [checker, setChecker] = useState("");
  const [value, setValue] = useState("");

  function submitFunction(userAnswer) {
    if (currentIndex < question.length) {
      if (userAnswer.length === question[currentIndex].answer.length) {
        // we re doing this because it not great to update state directly,
        //  but we are giving state a new object
        // this will spread all object in question
        const updatedQuestion = [...question];
        // this will create new object and new reference will be stored currentQuestionObject
        const currentQuestionObject = {
          ...updatedQuestion[currentIndex],
          is_correct: userAnswer === question[currentIndex].answer,
          user_answer: userAnswer,
        };

        // we are replacing the current object with new modified
        updatedQuestion[currentIndex] = currentQuestionObject;

        // now we are giving the state a new Question instead of modifying it directly
        setQuestion(updatedQuestion);

        if (userAnswer === question[currentIndex].answer) {
          setChecker("correct");

          setTimeout(() => {
            setChecker("");
          }, 500);
        }

        if (userAnswer !== question[currentIndex].answer) {
          setChecker("wrong");

          setTimeout(() => {
            setChecker("");
          }, 500);
        }

        setCurrentIndex(currentIndex + 1);
        setValue("");
      }
    }
  }

  function addText(text) {
    const newValue = value + text;
    setValue(newValue);
    submitFunction(newValue);
  }

  const inputStyle = `pointer-events-none md:pointer-events-auto w-full rounded-lg border border-gray-300 px-3 py-2 text-lg font-semibold outline-none transition  ${checker === "correct" ? "ring-1 ring-green-400" : ""} 
  ${checker === "wrong" ? "ring-1 ring-red-400" : ""}`;

  return (
    <main className="flex-1 flex flex-col justify-center">
      {/* <!-- Question --> */}
      <div className="rounded-xl border border-green-200 bg-white py-10 shadow-sm">
        <h2 className="text-center text-4xl font-bold tracking-wide text-gray-900">
          {currentIndex < question.length
            ? question[currentIndex].question
            : "Finished"}{" "}
        </h2>
      </div>

      {/* <!-- Answer --> */}

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Answer
        </label>

        {/* focus:border-green-600 focus:ring-2 focus:ring-green-200 */}

        <input
          type="text"
          value={value}
          placeholder="Type your answer..."
          disabled={currentIndex === question.length}
          className={inputStyle}
          onChange={(event) => {
            const onChangeValue = event.target.value;
            setValue(onChangeValue);
            submitFunction(onChangeValue);
          }}
        />
      </div>

      {/* <!-- ================= MOBILE KEYPAD ================= --> */}

      <div className="mt-7 md:hidden">
        <div className="grid grid-cols-3 gap-3">
          <button className="btn" onClick={() => addText("1")}>
            1
          </button>
          <button className="btn" onClick={() => addText("2")}>
            2
          </button>
          <button className="btn" onClick={() => addText("3")}>
            3
          </button>

          <button className="btn" onClick={() => addText("4")}>
            4
          </button>
          <button className="btn" onClick={() => addText("5")}>
            5
          </button>
          <button className="btn" onClick={() => addText("6")}>
            6
          </button>

          <button className="btn" onClick={() => addText("7")}>
            7
          </button>
          <button className="btn" onClick={() => addText("8")}>
            8
          </button>
          <button className="btn" onClick={() => addText("9")}>
            9
          </button>

          <button className="btn" onClick={() => addText("-")}>
            -
          </button>

          <button className="btn" onClick={() => addText("0")}>
            0
          </button>
          <button className="btn" onClick={() => setValue(value.slice(0, -1))}>
            ⌫
          </button>
        </div>
      </div>
    </main>
  );
}
