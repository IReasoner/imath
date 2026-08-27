import lockIcon from "../../assets/lockIcon.png";

export function CareerStageProgress({ stageLevelInfo, setCurrentStage }) {
  let progress = 10;

  stageLevelInfo.stage_data.forEach((stage) => {
    if (stage.stage < 4 && stage.status === "passed") {
      progress += 27;
    } else if (stage.stage === 4 && stage.status === "passed") {
      progress += 9;
    }
  });
  return (
    <div className="mt-7">
      <div className="relative">
        <div className="absolute left-0 right-0 top-4 px-4">
          {/* Gray background line */}

          <div className="h-0.5 w-full bg-gray-200">
            {/* Green progress line */}

            <div
              className="h-full bg-green-600 transition-all duration-50"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="relative grid grid-cols-4">
          {stageLevelInfo.stage_data.map((stage) => {
            /* eslint-disable */
            let border = null;
            let numberStyle = null;
            let text = null;

            if (stage.status === "passed") {
              border = "border-green-600 font-bold bg-green-600 text-white";
              numberStyle = "mt-2 text-xs font-semibold text-gray-700";
              text = "✓";
            } else if (stage.status === "current") {
              border = "border-green-600 font-bold bg-white text-green-700";
              numberStyle = "mt-2 text-xs font-semibold text-green-700";
              text = stage.stage;
            } else {
              border = "border-gray-300 bg-gray-100";
              numberStyle = "mt-2 text-xs font-medium text-gray-400";
              text = <img src={lockIcon} alt="lock_icon" className="w-5" />;
            }

            return (
              <button
                key={stage.stage}
                className={`relative flex flex-col items-center ${
                  stage.status !== "locked" ? "cursor-pointer" : ""
                }`}
                disabled={stage.status === "locked"}
                onClick={() => {
                  setCurrentStage(stage.stage);
                }}
              >
                {stage.active && (
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full bg-green-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                    Active
                  </span>
                )}

                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs
                ${border}
                ${stage.active ? "ring-4 ring-green-100" : ""}`}
                >
                  {text}
                </span>

                <span className={numberStyle}>{stage.stage}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
