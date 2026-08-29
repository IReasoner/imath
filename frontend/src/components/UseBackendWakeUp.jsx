import { useState, useEffect } from "react";
import axios from "axios";

export function useBackendWakeUp(isOnline) {
  const [isWakingUp, setIsWakingUp] = useState(true);

  useEffect(() => {
    if (!isOnline) return;

    let timeOut;

    const checkWakeUp = async () => {
      try {
        await axios.get("https://imath.onrender.com/api/health");
        setIsWakingUp(false);
      } catch (error) {
        if (!isOnline) {
          clearTimeout(timeOut);
          return;
        }

        timeOut = setTimeout(() => {
          checkWakeUp();
        }, 3000);
        console.log(error);
      }
    };

    checkWakeUp();

    return () => {
      clearTimeout(timeOut);
    };
  }, [isOnline]);

  return isWakingUp;
}
