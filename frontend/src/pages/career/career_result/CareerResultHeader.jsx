import { Link } from "react-router";
import imathIcon from "/math_icon.png";

export function CareerResultHeader() {
  return (
    <header className="flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
      <Link
        to="/career"
        className="text-lg font-bold tracking-tight text-green-700"
      >
        <div className="w-fit flex items-center">
          <img src={imathIcon} alt="imath icon" className="w-6" />
          <span>iMath</span>
        </div>
      </Link>

      <span className="text-sm font-semibold text-gray-700">Career Result</span>
    </header>
  );
}
