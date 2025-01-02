import EncounterCameraFeedTab from "@/components/EncounterCameraFeedTab";
import routes from "./routes";

const manifest = {
  plugin: "care-camera-device",
  routes,
  extends: ["DoctorConnectButtons"],
  components: {},
  encounterTabs: {
    feed: EncounterCameraFeedTab,
  },
} as const;

export default manifest;
