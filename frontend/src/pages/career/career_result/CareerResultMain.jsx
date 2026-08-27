import { Passed } from "./Passed";
import { Failed } from "./Failed";
import { LevelCompleted } from "./LevelCompleted";
import { Replayed } from "./Replayed";

export function CareerResultMain({ careerResultInfo }) {
  return (
    <main className="flex flex-1 items-center justify-center overflow-y-auto px-4 md:pb-6 pt-24 md:pt-57.5">
      {careerResultInfo.state == "passed" && (
        <Passed careerResultInfo={careerResultInfo} />
      )}
      {careerResultInfo.state == "failed" && (
        <Failed careerResultInfo={careerResultInfo} />
      )}
      {careerResultInfo.state == "completed" && (
        <LevelCompleted careerResultInfo={careerResultInfo} />
      )}
      {careerResultInfo.state == "replay" && (
        <Replayed careerResultInfo={careerResultInfo} />
      )}
    </main>
  );
}
