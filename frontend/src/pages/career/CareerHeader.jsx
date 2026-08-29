import { Link } from "react-router";
import imathIcon from "/math_icon.png";

export function CareerHeader({ meInfo, setShowLogOut }) {
  return (
    <header className="flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
      <Link to="/" className="text-lg font-bold tracking-tight text-green-700">
        <h1 className="text-xl font-bold text-center text-green-700">
          <div className="w-fit flex items-center">
            <img src={imathIcon} alt="imath icon" className="w-6" />
            <span>iMath</span>
          </div>
        </h1>
      </Link>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 transition hover:border-green-600 hover:text-green-700"
          onClick={() => setShowLogOut(true)}
        >
          Log out
        </button>

        {/* <!-- Profile --> */}
        <button className="group relative flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-gray-100">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
            {meInfo.username.slice(0, 2).toUpperCase()}
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold leading-tight">
              {meInfo.username}
            </p>

            <p className="text-xs text-gray-500">{meInfo.email}</p>
          </div>

          <div className="pointer-events-none absolute right-0 top-full z-30 mt-2 hidden w-48 rounded-lg border border-gray-200 bg-white p-3 text-left shadow-lg group-hover:block">
            <p className="text-sm font-semibold text-gray-900">
              {meInfo.username}
            </p>

            <p className="mt-1 truncate text-xs text-gray-500">
              {meInfo.email}
            </p>
          </div>
        </button>
      </div>
    </header>
  );
}
