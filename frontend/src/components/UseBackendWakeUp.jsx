import { useState, useEffect } from "react";
// import axios from "axios";
import api from "../utils/api_url";

export function useBackendWakeUp(isOnline) {
  const [isWakingUp, setIsWakingUp] = useState(true);

  useEffect(() => {
    if (!isOnline) return;

    let timeOut;

    const checkWakeUp = async () => {
      try {
        const reponspe = await api.get("/api/health");
        console.log(reponspe.data);
        setIsWakingUp(false);
      } catch (error) {
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
