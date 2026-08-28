import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { formatTime } from "../../utils/formatTime";
import { capitalize } from "../../utils/capitalize";
import axios from "axios";

import clockIcon from "../../assets/clock_blur.png";
import rangeIcon from "../../assets/range.png";

export function ChallengeSetUp({
  setQuestion,
  setTimeMs,
  setChallengePopUp,
  setSwitcher,
  isOnline,
}) {
  const [challengeData, setChallengeData] = useState(null);
  const [difficulty, setDifficulty] = useState("easy");
  const [type, setType] = useState("addition");
  const navigate = useNavigate();

  useEffect(() => {
    const getChallengeData = async () => {
      try {
        const response = await axios.get("/api/challenge", {
          params: {
            type: type,
            difficulty: difficulty,
          },
        });
        setChallengeData(response.data);
        setQuestion(response.data.question_box);
        setTimeMs(response.data.time_ms);
      } catch (error) {
        console.log(error);
      }
    };
    getChallengeData();

    /* eslint-disable */
  }, [type, difficulty]);

  if (!challengeData) {
    return null;
  }

  const range = `${challengeData.range.from} - ${challengeData.range.to}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto md:overflow-y-hidden bg-black/50 backdrop-blur-sm p-4">
      <div className="flex min-h-full items-center justify-center py-4">
        {/* <!-- Modal --> */}

        <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white shadow-xl">
          {/* <!-- Header --> */}
          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3">
            <h2 className="text-lg font-semibold text-gray-900">
              Challenge Setup
            </h2>

            <button
              className="text-xl text-gray-500 transition hover:text-red-600 cursor-pointer"
              onClick={() => setChallengePopUp(false)}
            >
              ✕
            </button>
          </div>

          {/* <!-- Body --> */}

          <div className="p-5">
            {/* <!-- Notice --> */}

            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3">
              <div className="flex items-start gap-3">
                <span className="text-lg"> 📢 </span>

                <div>
                  <h3 className="text-sm font-semibold text-green-800">
                    Important Notice
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-green-700">
                    Your test will be submitted automatically when the timer
                    reaches zero. Please confirm your settings before starting.
                  </p>
                </div>
              </div>
            </div>

            {/* <!-- Form --> */}

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {/* <!-- Left --> */}

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Difficulty
                  </label>

                  <select
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200 cursor-pointer"
                    value={difficulty}
                    onChange={(event) => {
                      setDifficulty(event.target.value);
                    }}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Question Type
                  </label>

                  <select
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200 cursor-pointer"
                    value={type}
                    onChange={(event) => {
                      setType(event.target.value);
                    }}
                  >
                    <option value="addition">Addition</option>
                    <option value="subtraction">Subtraction</option>
                    <option value="multiplication">Multiplication</option>
                  </select>
                </div>
              </div>

              {/* <!-- Right --> */}

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Duration
                  </label>

                  <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700">
                    <img src={clockIcon} alt="clock icon" className="w-5" />
                    <span>{formatTime(challengeData.time_ms)}</span>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Number Range
                  </label>

                  <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700">
                    <span className="bg-green-100">
                      <img src={rangeIcon} alt="clock icon" className="w-5" />
                    </span>

                    <span>{range}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Example --> */}

            <div className="mt-5">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Example Question
              </label>

              <div className="rounded-lg border border-green-200 bg-green-50 py-2 text-center text-sm font-semibold text-green-700">
                {challengeData.example}
              </div>
            </div>

            {/* <!-- Summary --> */}

            <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-600">
              <span className="font-medium text-gray-800"> Selected: </span>
              {`${capitalize(difficulty)} • ${capitalize(type)} • ${formatTime(challengeData.time_ms)} • ${range}`}
              {/* Easy • Addition • 15 Minutes • Range 1–15 */}
            </div>

            {/* <!-- Button --> */}

            <button
              className="mt-5 h-10 w-full rounded-lg bg-green-600 text-sm font-semibold text-white transition hover:bg-green-700 cursor-pointer"
              onClick={() => {
                if (isOnline) {
                  setSwitcher("/");
                  navigate("/quiz");
                }
              }}
            >
              Start Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
