import { useEffect, useRef, useState } from "react";
import timeIcon from "../../assets/clock_blur.png";
import redClock from "../../assets/red_clock.png";

export function QuizEngineTimer({
  timeMs,
  setTimeMs,
  resultNavigator,
  currentIndex,
  question,
}) {
  const [deadline, setDeadline] = useState(false);
  const intervalRef = useRef(null);
  const deadlineREf = useRef(false);

  useEffect(() => {
    if (currentIndex === question.length) {
      clearInterval(intervalRef.current);
    }
  }, [currentIndex, question]);

  useEffect(() => {
    const endTime = Date.now() + timeMs;

    const interval = setInterval(() => {
      const remaining = endTime - Date.now();

      setTimeMs(remaining);

      if (remaining < 30_000 && !deadlineREf.current) {
        deadlineREf.current = true;
        setDeadline(true);
      }

      if (remaining <= 0) {
        clearInterval(interval);
        setDeadline(false);
        resultNavigator();
        return null;
      }
    }, 1000);

    intervalRef.current = interval;
    return () => {
      clearInterval(interval);
      setDeadline(false);
    };
    /* eslint-disable */
  }, []);

  // using a single totat seconds fixed the problem am having with my timer

  const totalSeconds = Math.ceil(timeMs / 1000);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <div
      className={`flex items-center gap-1 font-medium ${deadline ? "text-red-600" : "text-gray-700"}`}
    >
      <span className="mt-0.5">
        {!deadline ? (
          <img src={timeIcon} alt="clock time" className="w-5 " />
        ) : (
          <img src={redClock} alt="clock time" className="w-5 " />
        )}
      </span>

      <span className="w-9">{`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</span>
    </div>
  );
}
