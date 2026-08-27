import dayjs from "dayjs";

export function formatTime(time_ms) {
  return dayjs(time_ms).format("mm:ss");
}
