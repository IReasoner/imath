import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";

import { HomePage } from "./pages/home/HomePage";
import { LoginPage } from "./pages/login/LoginPage";
import { RegisterPage } from "./pages/register/RegisterPage";
import { CareerPage } from "./pages/career/CareerPage";
import { QuizEngine } from "./pages/quiz_engine/QuizEngine";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { OnlineState } from "./components/OnlineState";
import { OfflineState } from "./components/OfflineState";
import { ChallengeResultPage } from "./pages/challenge/challenge_result/ChallengeResultPage";
import { ReviewPage } from "./pages/review/ReviewPage";
import { CareerResultPage } from "./pages/career/career_result/CareerResultPage";
import { WakingUp } from "./components/WakingUp";
import { useBackendWakeUp } from "./components/UseBackendWakeUp";

function App() {
  const [question, setQuestion] = useState(null);
  const [timeMs, setTimeMs] = useState(null);
  const [switcher, setSwitcher] = useState(null);
  const [careerResultInfo, setCareerResultInfo] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [isOnline, setIsOnline] = useState(null);
  const backendReady = useBackendWakeUp(isOnline);

  useEffect(() => {
    if (!navigator.onLine) {
      /* eslint-disable */
      setConnectionStatus("offline");
      setIsOnline(false);
    } else {
      setIsOnline(true);
    }

    window.addEventListener("online", () => {
      setConnectionStatus("online");
      setIsOnline(true);
      setTimeout(() => {
        setConnectionStatus(null);
      }, 1500);
    });

    window.addEventListener("offline", () => {
      setConnectionStatus("offline");
      setIsOnline(false);
    });
  }, []);

  if (backendReady) {
    return (
      <>
        {connectionStatus === "online" && <OnlineState />}
        {connectionStatus === "offline" && (
          <OfflineState setConnectionStatus={setConnectionStatus} />
        )}
        <WakingUp />
      </>
    );
  }

  return (
    <>
      {connectionStatus === "online" && <OnlineState />}
      {connectionStatus === "offline" && (
        <OfflineState setConnectionStatus={setConnectionStatus} />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              setQuestion={setQuestion}
              setTimeMs={setTimeMs}
              setSwitcher={setSwitcher}
              isOnline={isOnline}
              setConnectionStatus={setConnectionStatus}
            />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="career"
          element={
            <ProtectedRoute>
              <CareerPage
                setQuestion={setQuestion}
                setTimeMs={setTimeMs}
                setSwitcher={setSwitcher}
                isOnline={isOnline}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="quiz"
          element={
            <QuizEngine
              question={question}
              setQuestion={setQuestion}
              timeMs={timeMs}
              setTimeMs={setTimeMs}
              switcher={switcher}
              setCareerResultInfo={setCareerResultInfo}
              isOnline={isOnline}
            />
          }
        />
        <Route
          path="challenge result"
          element={<ChallengeResultPage question={question} />}
        />
        <Route
          path="career result"
          element={<CareerResultPage careerResultInfo={careerResultInfo} />}
        />
        <Route
          path="review"
          element={<ReviewPage question={question} switcher={switcher} />}
        />
      </Routes>
    </>
  );
}

export default App;
