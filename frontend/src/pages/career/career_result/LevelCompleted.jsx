import { Link } from "react-router";
import congratIcon from "../../../assets/congrat.png";
import unlockedIcon from "../../../assets/unlock.png";

export function LevelCompleted({ careerResultInfo }) {
  return (
    <section className="w-full max-w-lg md:max-w-md rounded-2xl border border-green-200 bg-white p-5 shadow-sm mt-24">
      {/* <!-- Celebration --> */}

      <div className="flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl">
          <img src={congratIcon} alt="congratulation icon" className="w-10" />
        </div>
      </div>

      {/* <!-- Heading --> */}

      <div className="mt-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
          Level Complete
        </p>

        <h1 className="mt-1 text-2xl font-bold">Excellent work!</h1>

        <p className="mt-1 text-sm text-gray-500">
          You've completed every stage in this level.
        </p>
      </div>

      {/* <!-- Level --> */}

      <div className="mt-5 rounded-xl bg-green-50 p-4 text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
          Level Completed
        </p>

        <p className="mt-1 text-2xl font-bold text-green-700">
          Level {careerResultInfo.level}
        </p>

        <p className="mt-1 text-sm text-gray-500">4 / 4 stages completed</p>

        {/* <!-- Score from the final stage --> */}
        <div className="mt-4 border-t border-green-200 pt-3">
          <p className="text-xs font-medium text-gray-500">Final Stage Score</p>

          <p className="mt-1 text-xl font-bold text-green-700">{`${careerResultInfo.score} / ${careerResultInfo.total_question}`}</p>

          <p className="mt-1 text-xs text-gray-500">Great performance!</p>
        </div>
      </div>

      {/* <!-- Completed stages --> */}

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2.5">
          <span className="text-sm font-medium"> Addition </span>

          <span className="text-xs font-semibold text-green-700">
            ✓ Complete
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2.5">
          <span className="text-sm font-medium"> Subtraction </span>

          <span className="text-xs font-semibold text-green-700">
            ✓ Complete
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2.5">
          <span className="text-sm font-medium"> Multiplication </span>

          <span className="text-xs font-semibold text-green-700">
            ✓ Complete
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2.5">
          <span className="text-sm font-medium"> Random </span>

          <span className="text-xs font-semibold text-green-700">
            ✓ Complete
          </span>
        </div>
      </div>

      {/* <!-- Unlock next level --> */}

      <div className="mt-4 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm text-white">
          <img src={unlockedIcon} alt="unlocked icon" className="w-4" />
        </div>

        <div>
          <p className="text-sm font-semibold">
            Level {careerResultInfo.unlocked_level} unlocked
          </p>

          <p className="mt-0.5 text-xs text-gray-500">
            Continue your career to begin the next level.
          </p>
        </div>
      </div>

      {/* <!-- Actions --> */}

      <div className="mt-5 space-y-2">
        <Link
          to="/career"
          className="block w-full rounded-lg bg-green-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-green-700"
        >
          Continue Career
        </Link>

        <Link
          to="/review"
          className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Review Answers
        </Link>
      </div>
    </section>
  );
}
