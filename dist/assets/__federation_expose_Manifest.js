import { j as jsx, E as EncounterCameraFeedTab } from './EncounterCameraFeedTab.js';

const routes = {
  "/devices/camera/test": () => /* @__PURE__ */ jsx(EncounterCameraFeedTab, {})
};

const manifest = {
  plugin: "care-camera-device",
  routes,
  extends: ["DoctorConnectButtons"],
  components: {},
  encounterTabs: {
    feed: EncounterCameraFeedTab
  }
};

export { manifest as default };
