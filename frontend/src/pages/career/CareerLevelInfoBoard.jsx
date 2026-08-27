import { formatTime } from "../../utils/formatTime";

export function CareerLevelInfoBoard({ stageLevelInfo, careerMe }) {
  const range = `${stageLevelInfo.range.from} - ${stageLevelInfo.range.to}`;
  return (
    <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* <!-- Level information --> */}

        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
              {stageLevelInfo.level}
            </span>

            <h3 className="text-base font-bold text-gray-900">
              Level {stageLevelInfo.level}
            </h3>
          </div>

          <p className="mt-1 text-sm text-gray-600">
            Complete all four stages to unlock Level {careerMe.next_level}.
          </p>
        </div>

        {/* <!-- Level details --> */}

        <div className="flex gap-5 text-sm">
          <div>
            <p className="text-xs text-gray-500">Questions</p>

            <p className="font-semibold">{range}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Time</p>

            <p className="font-semibold">
              {formatTime(stageLevelInfo.time_ms)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
