import { useEffect, useState } from "react";
import { QuizEngineMain } from "./QuizEngineMain";
import { QuizEngineHeader } from "./QuizEngineHeader";
import { QuizEngineFooter } from "./QuizEngineFooter";
import { useNavigate } from "react-router";
import axios from "axios";

export function QuizEngine({
  question,
  setQuestion,
  timeMs,
  setTimeMs,
  switcher,
  setCareerResultInfo,
  isOnline,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  async function resultNavigator() {
    if (switcher === "/career") {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("access_token");
      const correct_score = question.filter(
        (question) => question.is_correct,
      ).length;
      const level = localStorage.getItem("requested_level");
      const stage = localStorage.getItem("requested_stage");

      try {
        const response = await axios.patch(
          `http://localhost:8000/api/user/progress/${userId}`,
          {
            level: level,
            stage: stage,
            score: correct_score,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setCareerResultInfo(response.data);
        navigate("/career result");
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/challenge result");
    }
  }

  useEffect(() => {
    if (!question) navigate("/");
    /* eslint-disable */
  }, []);

  if (!question) return null;

  return (
    <>
      <title>iMath | Quiz</title>

      <div className="bg-gray-50">
        <div className="mx-auto flex h-dvh max-w-3xl flex-col px-4 py-4">
          <QuizEngineHeader
            question={question}
            currentIndex={currentIndex}
            timeMs={timeMs}
            setTimeMs={setTimeMs}
            switcher={switcher}
            resultNavigator={resultNavigator}
          />

          <QuizEngineMain
            question={question}
            setQuestion={setQuestion}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />

          <QuizEngineFooter
            question={question}
            currentIndex={currentIndex}
            resultNavigator={resultNavigator}
            isOnline={isOnline}
          />
        </div>
      </div>
    </>
  );
}
