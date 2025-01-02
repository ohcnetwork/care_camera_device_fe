import { AssetClass, AssetData, AssetLocationType, AssetType } from "../types";
import CameraFeed from "@/components/CameraFeed";
import useOperateCamera from "@/hooks/useOperateCamera";

const sampleAsset: AssetData = {
  id: "fd605386-90d5-4e8b-bb82-f62b7349d1d3",
  status: "ACTIVE",
  asset_type: AssetType.INTERNAL,
  location: "09ab6e88-9132-434a-b8ab-b342b10e7bef",
  location_object: {
    id: "09ab6e88-9132-434a-b8ab-b342b10e7bef",
    facility: {
      id: "0c95c7f0-e1d2-4aff-83fa-933cef60d3a8",
      name: "Critical Care",
    },
    location_type: AssetLocationType.OTHER,
    created_date: "2021-12-31T11:36:29.189571+05:30",
    modified_date: "2024-05-30T11:36:37.682666+05:30",
    name: "ICU",
    description: "",
    middleware_address: "dev-middleware.coronasafe.xyz",
  },
  last_service: undefined,
  resolved_middleware: {
    hostname: "dev-middleware.coronasafe.xyz",
    source: "asset",
  },
  latest_status: "Down",
  created_date: "2022-01-17T18:12:50.120542+05:30",
  modified_date: "2024-12-20T11:59:16.590909+05:30",
  name: "Dev Camera",
  description: "HIKVISION Camera Test Unit",
  asset_class: AssetClass.ONVIF,
  is_working: true,
  not_working_reason: "",
  serial_number: "",
  meta: {
    asset_type: "CAMERA",
    local_ip_address: "192.168.1.116",
    camera_access_key:
      "remote_user:2jCkrCRSeahzKEU:73c8d78d-e7f4-491d-9ea7-743cd46f80a0",
    middleware_hostname: "dev-middleware.coronasafe.xyz",
  },
  vendor_name: "",
  support_name: "",
  support_phone: "+919111111111",
  support_email: "",
  qr_code_id: "4e44705e-c967-4e22-a129-0cd3d554aa39",
  manufacturer: "",
  warranty_amc_end_of_validity: "",
};

interface Props {
  // facilityId: string;
  // encounter: Encounter;
  // patient: Patient;
}

const EncounterCameraFeedTab = (_props: Props) => {
  const asset = sampleAsset;
  const { operate } = useOperateCamera(asset.id);
  return (
    <div className="w-full overflow-hidden rounded-lg bg-white shadow">
      <CameraFeed asset={asset} operate={operate} />
    </div>
  );
};

export default EncounterCameraFeedTab;
