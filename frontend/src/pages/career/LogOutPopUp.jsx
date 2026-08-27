import { useNavigate } from "react-router";

export function LogOutPopUp({ setShowLogOut }) {
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("access_token");
    navigate("/");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      {/* <!-- Modal --> */}

      <section className="relative w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl">
        <button
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
          aria-label="Close logout confirmation"
          onClick={() => setShowLogOut(false)}
        >
          ✕
        </button>

        {/* <!-- Icon --> */}

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
          <span className="text-xl text-green-700"> → </span>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-bold tracking-tight text-gray-900">
            Leaving already?
          </h2>

          <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
            Are you sure you want to log out of your iMath account? You can sign
            back in anytime to continue your progress.
          </p>
        </div>

        <div className="my-5 h-px bg-gray-100"></div>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 cursor-pointer"
            onClick={() => setShowLogOut(false)}
          >
            Stay logged in
          </button>

          <button
            className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 cursor-pointer"
            onClick={logOut}
          >
            Log out
          </button>
        </div>
      </section>
    </div>
  );
}
