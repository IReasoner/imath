import { formatTime } from "../../utils/formatTime";
import { capitalize } from "../../utils/capitalize";
import { useNavigate } from "react-router";
// import axios from "axios";
import api from "../../utils/api_url";

export function CareerSelectedStageBoard({
  stageLevelInfo,
  setQuestion,
  setTimeMs,
  setSwitcher,
  isOnline,
}) {
  const navigate = useNavigate();
  async function loadCareerQuestion() {
    const token = localStorage.getItem("access_token");
    const userId = localStorage.getItem("userId");

    if (
      localStorage.getItem("requested_level") !== null &&
      localStorage.getItem("requested_stage") !== null
    ) {
      localStorage.removeItem("requested_level");
      localStorage.removeItem("requested_stage");
    }
    try {
      const response = await api.get(`/api/career/question/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          requested_level: stageLevelInfo.level,
          requested_stage: stageLevelInfo.stage,
        },
      });

      setQuestion(response.data);
      setTimeMs(stageLevelInfo.time_ms);
      setSwitcher("/career");
      navigate("/quiz");
      localStorage.setItem("requested_level", stageLevelInfo.level);
      localStorage.setItem("requested_stage", stageLevelInfo.stage);
    } catch (error) {
      console.log(error);
    }
  }

  const range = `${stageLevelInfo.range.from} - ${stageLevelInfo.range.to}`;

  const currentStage = stageLevelInfo.stage_data.find((stage) => {
    return stageLevelInfo.stage === stage.stage;
  });

  return (
    <section className="mt-7 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Selected Stage
          </p>

          <h3 className="mt-1 text-lg font-bold">
            Stage {stageLevelInfo.stage}
          </h3>
        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          {currentStage.status === "current" ? " Available" : "Completed"}
        </span>
      </div>

      <div className="mt-5 rounded-lg bg-gray-50 p-3 text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
          Stage Type
        </p>

        <p className="mt-1 text-xl font-bold text-gray-900">
          {capitalize(stageLevelInfo.stage_type)}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
          <p className="text-xs text-gray-500">Questions</p>

          <p className="mt-1 text-sm font-semibold">{range}</p>
        </div>

        <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
          <p className="text-xs text-gray-500">Time</p>

          <p className="mt-1 text-sm font-semibold">
            {formatTime(stageLevelInfo.time_ms)}
          </p>
        </div>
      </div>

      <button
        className="mt-4 w-full rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 cursor-pointer"
        onClick={() => {
          if (isOnline) loadCareerQuestion();
        }}
      >
        Begin Stage
      </button>
    </section>
  );
}
