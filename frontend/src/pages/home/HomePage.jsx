import { useState } from "react";
import { useNavigate } from "react-router";
import { ChallengeSetUp } from "../challenge/ChallengeSetUp";
import challengeIcon from "../../assets/thunder.png";
import careerIcon from "../../assets/brain_career1.png";

export function HomePage({
  setQuestion,
  setTimeMs,
  setSwitcher,
  isOnline,
  setConnectionStatus,
}) {
  const [challengePopUp, setChallengePopUp] = useState(false);

  return (
    <div className="h-dvh overflow-scroll bg-gradient-to from-white via-green-50 to-green-100">
      {/* <!-- Overall container --> */}

      <div className="h-full flex flex-col px-5 py-5 md:max-w-5xl md:mx-auto">
        <header className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500 tracking-wide">Created By</p>

            <h2 className="text-2xl font-extrabold text-green-700">
              iReasoner
            </h2>
          </div>

          <div className="hidden md:flex items-center gap-2 text-green-700 font-semibold">
            <span className="text-xl"> π </span>

            <span> Mathematics For Everyone </span>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center py-3">
          {/* <!-- App Name --> */}

          <h1 className="mt-6 text-5xl font-black text-gray-900">iMath</h1>

          <p className="mt-2 text-gray-600 text-center">
            Learn. Practice. Master Mathematics.
          </p>

          {/* <!-- Buttons --> */}

          {challengePopUp && (
            <ChallengeSetUp
              setChallengePopUp={setChallengePopUp}
              setQuestion={setQuestion}
              setTimeMs={setTimeMs}
              setSwitcher={setSwitcher}
              isOnline={isOnline}
            />
          )}

          <div className="mt-8 grid w-full max-w-lg grid-cols-1 gap-3 sm:grid-cols-2">
            <div
              // to={isOnline ? "/career" : ""}
              className="group relative rounded-xl border border-green-200 bg-green-50 p-4 text-left transition hover:-translate-y-0.5 hover:border-green-600 hover:shadow-md active:opacity-70"
            >
              <span className="absolute right-3 top-3 rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-green-700 shadow-sm">
                Sign in required
              </span>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 text-lg text-white">
                <img src={careerIcon} alt="" />
              </div>

              <h2 className="mt-3 text-base font-bold text-gray-900">Career</h2>

              <p className="mt-1 text-xs leading-relaxed text-gray-600">
                Progress through levels and build your math skills.
              </p>

              <div className="mt-3 text-xs font-semibold text-green-700">
                Start your journey →
              </div>
            </div>

            <div
              className="group rounded-xl border border-gray-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-green-600 hover:shadow-md cursor-pointer active:opacity-70"
              onClick={() => {
                if (isOnline) {
                  setChallengePopUp(true);
                } else {
                  setConnectionStatus("offline");
                }
              }}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100  text-lg text-white">
                <img src={challengeIcon} alt="" />
              </div>

              <h2 className="mt-3 text-base font-bold text-gray-900">
                Challenge
              </h2>

              <p className="mt-1 text-xs leading-relaxed text-gray-600">
                Pick a topic and difficulty, then test your math skills.
              </p>

              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-green-700">
                Play without signing in
                <span>→</span>
              </div>
            </div>
          </div>

          {/* <!-- About --> */}

          <section className="mt-12 w-full max-w-2xl">
            <h2 className="text-center text-xl font-bold text-gray-900">
              About iMath
            </h2>

            <div className="mt-4 rounded-2xl border border-green-200 bg-white shadow-lg p-6">
              <p className="leading-8 text-center text-gray-600 text-sm">
                <span className="font-bold text-green-700"> iMath </span>
                is an interactive mathematics learning platform designed to help
                learners build confidence through consistent practice and
                engaging challenges. Whether you're strengthening fundamental
                concepts or preparing for examinations, iMath provides a simple,
                focused, and effective environment to improve your mathematical
                skills at your own pace.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
