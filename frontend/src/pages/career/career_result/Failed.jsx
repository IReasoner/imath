import { Link } from "react-router";
import { capitalize } from "../../../utils/capitalize";
export function Failed({ careerResultInfo }) {
  return (
    <section className="w-full max-w-lg md:max-w-md rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* <!-- Icon --> */}

      <div className="flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-500">
          !
        </div>
      </div>

      {/* <!-- Heading --> */}

      <div className="mt-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Stage Not Passed
        </p>

        <h1 className="mt-1 text-2xl font-bold">Keep practicing</h1>

        <p className="mx-auto mt-1 max-w-sm text-sm text-gray-500">
          You didn't reach the required score this time. Review your answers and
          try again.
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

      {/* <!-- Score --> */}

      <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
        <p className="text-xs font-medium text-gray-500">Your Score</p>

        <p className="mt-1 text-3xl font-bold text-gray-700">{`${careerResultInfo.score} / ${careerResultInfo.total_question}`}</p>

        <p className="mt-1 text-xs text-gray-500">
          Required score:{" "}
          {`${careerResultInfo.required_score} / ${careerResultInfo.total_question}`}
        </p>
      </div>

      {/* <!-- Information --> */}

      <div className="mt-4 rounded-lg border border-gray-200 bg-white p-3 text-center">
        <p className="text-sm font-medium text-gray-700">
          {careerResultInfo.locked_stage
            ? `Stage ${careerResultInfo.locked_stage}`
            : `Level ${careerResultInfo.next_level}`}{" "}
          is still locked.
        </p>

        <p className="mt-1 text-xs text-gray-500">
          Pass Stage {careerResultInfo.stage} to continue your progression.
        </p>
      </div>

      {/* <!-- Actions --> */}

      <div className="mt-5 space-y-2">
        <Link
          to="/career"
          className="block w-full rounded-lg bg-green-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-green-700"
        >
          Try Again
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
