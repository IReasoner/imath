import { Link } from "react-router";
import { capitalize } from "../../../utils/capitalize";
export function Replayed({ careerResultInfo }) {
  return (
    <section className="w-full max-w-md rounded-2xl border border-green-200 bg-white p-5 shadow-sm">
      {/* <!-- Icon --> */}

      <div className="flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
          ✓
        </div>
      </div>

      {/* <!-- Heading --> */}

      <div className="mt-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
          Stage Replayed
        </p>

        <h1 className="mt-1 text-2xl font-bold">Nice practice!</h1>

        <p className="mt-1 text-sm text-gray-500">
          You've completed this stage before. Your career progress remains
          unchanged.
        </p>
      </div>

      {/* <!-- Stage information --> */}

      <div className="mt-5 rounded-xl bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Level</p>

            <p className="font-semibold">Level {careerResultInfo.level}</p>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-500">Stage</p>

            <p className="font-semibold">Stage {careerResultInfo.stage}</p>
          </div>
        </div>

        <div className="mt-3 border-t border-gray-200 pt-3">
          <p className="text-xs text-gray-500">Category</p>

          <p className="mt-1 font-semibold">
            {capitalize(careerResultInfo.stage_type)}
          </p>
        </div>
      </div>

      {/* <!-- Replay score --> */}

      <div className="mt-4 rounded-xl border border-green-100 bg-green-50 p-4 text-center">
        <p className="text-xs font-medium text-gray-500">Replay Score</p>

        <p className="mt-1 text-3xl font-bold text-green-700">{`${careerResultInfo.score} / ${careerResultInfo.total_question}`}</p>

        <p className="mt-1 text-xs text-gray-500">Your score for this replay</p>
      </div>

      {/* <!-- Already completed message --> */}

      <div className="mt-4 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
          ✓
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-900">
            Stage already completed
          </p>

          <p className="mt-0.5 text-xs text-gray-500">
            This stage was previously passed and your progress is already saved.
          </p>
        </div>
      </div>

      {/* <!-- Actions --> */}

      <div className="mt-5 space-y-2">
        <Link
          to="/career"
          className="block w-full rounded-lg bg-green-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-green-700"
        >
          Back to Career
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
