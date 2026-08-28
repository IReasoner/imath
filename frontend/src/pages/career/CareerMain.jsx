import { CareerStageProgress } from "./CareerStageProgrees";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { CareerNavigator } from "./CareerNavigator";
import { CareerLevelInfoBoard } from "./CareerLevelInfoBoard";
import { CareerSelectedStageBoard } from "./CareerSeletedStageBoard";
import { CareerLockedLevel } from "./CareerLockedLevel";

export function CareerMain({
  careerMe,
  setQuestion,
  setTimeMs,
  setSwitcher,
  isOnline,
}) {
  const [level, setLevel] = useState(careerMe.current_level);
  const [currentStage, setCurrentStage] = useState(careerMe.current_stage);
  const [stageLevelInfo, setStageLevelInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadStageLevelInfo = async () => {
      const token = localStorage.getItem("access_token");
      const userId = localStorage.getItem("userId");
      try {
        const response = await axios.get(`/api/career/info/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },

          params: {
            requested_level: level,
            requested_stage: currentStage,
          },
        });
        setStageLevelInfo(response.data);
      } catch (error) {
        if (error.response.status === 401) {
          navigate("/");
          localStorage.removeItem("access_token");
        }
      }
    };

    loadStageLevelInfo();
    /* eslint-disable */
  }, [currentStage, level]);

  if (!stageLevelInfo) return null;

  return (
    <main className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
      {/* <!-- Page title --> */}
      <div className="mb-5 text-center">
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl">Career</h1>

        <p className="mt-1 text-sm text-gray-500">
          Build your skills and progress through each level.
        </p>
      </div>

      <section className="mx-auto max-w-3xl">
        <CareerNavigator
          careerMe={careerMe}
          stageLevelInfo={stageLevelInfo}
          setLevel={setLevel}
        />
        {stageLevelInfo.status === "locked" ? (
          <CareerLockedLevel stageLevelInfo={stageLevelInfo} />
        ) : (
          <>
            <CareerLevelInfoBoard
              stageLevelInfo={stageLevelInfo}
              careerMe={careerMe}
            />

            <CareerStageProgress
              stageLevelInfo={stageLevelInfo}
              setCurrentStage={setCurrentStage}
            />

            <CareerSelectedStageBoard
              stageLevelInfo={stageLevelInfo}
              setQuestion={setQuestion}
              setTimeMs={setTimeMs}
              setSwitcher={setSwitcher}
              isOnline={isOnline}
            />
          </>
        )}
      </section>
    </main>
  );
}
