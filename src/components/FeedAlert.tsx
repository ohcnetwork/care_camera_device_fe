import { StreamStatus } from "../types";
import { useEffect } from "react";

export type FeedAlertState =
  | StreamStatus
  | "moving"
  | "zooming"
  | "saving_preset"
  | "host_unreachable";

interface Props {
  state?: FeedAlertState;
}

// const ALERT_ICON_MAP: Partial<Record<FeedAlertState, IconName>> = {
//   playing: "l-play-circle",
//   stop: "l-stop-circle",
//   offline: "l-exclamation-triangle",
//   loading: "l-spinner",
//   // moving: "l-expand-from-corner",
//   zooming: "l-search",
//   saving_preset: "l-save",
//   host_unreachable: "l-exclamation-triangle",
// };

export default function FeedAlert({ state }: Props) {
  // TODO: use toast
  useEffect(() => {
    console.log(state);
  }, [state]);

  return <></>;
}
