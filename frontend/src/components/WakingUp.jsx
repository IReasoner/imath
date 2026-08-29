import imathIcon from "/math_icon.png";

export function WakingUp() {
  return (
    <>
      <title>iMath | Starting Server</title>
      <div className="overflow-hidden bg-white text-gray-900">
        <main className="relative flex h-dvh w-full items-center justify-center overflow-hidden px-5">
          <span className="floating-symbol absolute left-[10%] top-[18%] text-xl font-bold text-green-300 sm:text-2xl">
            +
          </span>

          <span className="floating-symbol-slow absolute right-[12%] top-[14%] text-2xl font-bold text-green-300 sm:text-3xl">
            ÷
          </span>

          <span className="floating-symbol-slow absolute left-[8%] top-[55%] text-lg font-bold text-green-300 sm:text-2xl">
            ×
          </span>

          <span className="floating-symbol absolute right-[9%] top-[60%] text-xl font-bold text-green-300 sm:text-2xl">
            −
          </span>

          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-50 sm:h-80 sm:w-80"></div>

          <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-green-100 sm:h-56 sm:w-56"></div>

          <section className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
            <div className="imath-breathe flex">
              <img src={imathIcon} alt="imath icon" className="w-10" />

              <h1 className="text-4xl font-black tracking-tight sm:text-4xl flex">
                iMath
              </h1>
            </div>

            <div className="mt-3 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-600"></span>

              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500"
                style={{ animationDelay: "200ms" }}
              ></span>

              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400"
                style={{ animationDelay: "400ms" }}
              ></span>
            </div>

            <div className="mt-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-green-100 bg-green-50 shadow-sm sm:h-20 sm:w-20">
              <div className="space-y-2">
                <div className="flex h-2 w-8 items-center rounded-full bg-green-600 px-1 sm:w-10">
                  <span className="ml-auto h-1 w-1 rounded-full bg-white"></span>
                </div>

                <div className="flex h-2 w-8 items-center rounded-full bg-green-500 px-1 sm:w-10">
                  <span className="ml-auto h-1 w-1 rounded-full bg-white"></span>
                </div>

                <div className="flex h-2 w-8 items-center rounded-full bg-green-400 px-1 sm:w-10">
                  <span className="ml-auto h-1 w-1 rounded-full bg-white"></span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                Waking up the server
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-gray-500 sm:text-base">
                iMath is getting everything ready for you. This may take a few
                moments.
              </p>
            </div>

            <div className="mt-7 w-full max-w-xs">
              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div className="loading-animation absolute left-0 h-full w-1/3 rounded-full bg-green-600"></div>
              </div>

              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="h-1.5 w-1.5 animate-ping rounded-full bg-green-600"></span>

                <p className="text-xs font-medium text-gray-500">
                  Connecting to server...
                </p>
              </div>
            </div>

            <p className="mt-8 text-xs text-gray-400">
              Thanks for your patience.
            </p>
          </section>

          <div className="absolute bottom-5 text-center">
            <p className="text-xs font-medium text-gray-400">
              Practice. Progress. Improve.
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
