import { Link } from "react-router";

export function CareerResultHeader() {
  return (
    <header className="flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
      <Link
        to="/career"
        className="text-lg font-bold tracking-tight text-green-700"
      >
        iMath
      </Link>

      <span className="text-sm font-semibold text-gray-700">Career Result</span>
    </header>
  );
}
