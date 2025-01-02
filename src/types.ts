export interface PTZPayload {
  x: number;
  y: number;
  zoom: number;
}

export type StreamStatus = "playing" | "stop" | "loading" | "offline";

export type GetStatusResponse = {
  result: {
    position: PTZPayload;
    moveStatus: {
      panTilt: "IDLE" | "MOVING";
      zoom: "IDLE" | "MOVING";
    };
    error: string;
    utcTime: string;
  };
};

export type GetStreamTokenResponse = {
  result: {
    token: string;
  };
};

export type GetPresetsResponse = {
  result: Record<string, number>;
};

export type CameraPreset = {
  readonly id: string;
  name: string;
  readonly asset_bed: AssetBedModel;
  position: PTZPayload;
  //   readonly created_by: UserBareMinimum;
  //   readonly updated_by: UserBareMinimum;
  readonly created_date: string;
  readonly modified_date: string;
  readonly is_migrated: boolean;
};

// TODO: i don't think this is suppose to be here
// figure out where to put it.

export interface BedModel {
  id?: string;
  bed_type?: string;
  name?: string;
  description?: string;
  facility?: string;
  location_object?: {
    name: string;
    id: string;
    facility?: { name: string; id: string };
  };
  location?: string;
  is_occupied?: boolean;
  created_date?: string;
  modified_date?: string;
}

export enum AssetLocationType {
  OTHER = "OTHER",
  WARD = "WARD",
  ICU = "ICU",
}

export interface AssetLocationObject {
  id?: string;
  name: string;
  description: string;
  created_date?: string;
  modified_date?: string;
  location_type: AssetLocationType;
  middleware_address?: string;
  facility?: {
    id: string;
    name: string;
  };
}

export enum AssetType {
  NONE = "NONE",
  INTERNAL = "INTERNAL",
  EXTERNAL = "EXTERNAL",
}

export enum AssetClass {
  NONE = "NONE",
  ONVIF = "ONVIF",
  HL7MONITOR = "HL7MONITOR",
  VENTILATOR = "VENTILATOR",
}

export const AssetStatus = {
  not_monitored: "Not Monitored",
  operational: "Operational",
  down: "Down",
  maintenance: "Under Maintenance",
};

export interface AssetService {
  id: string;
  created_date: string;
  modified_date: string;
  serviced_on: string;
  note: string;
}

export interface ResolvedMiddleware {
  hostname: string;
  source: "asset" | "location" | "facility";
}

export interface AssetData {
  id: string;
  name: string;
  location: string;
  description: string;
  is_working: boolean;
  not_working_reason: string;
  created_date: string;
  modified_date: string;
  serial_number: string;
  asset_type: AssetType;
  asset_class?: AssetClass;
  location_object: AssetLocationObject;
  status: "ACTIVE" | "TRANSFER_IN_PROGRESS";
  vendor_name: string;
  support_name: string;
  support_email: string;
  support_phone: string;
  qr_code_id: string;
  manufacturer: string;
  warranty_amc_end_of_validity: string;
  resolved_middleware?: ResolvedMiddleware;
  latest_status: string;
  last_service?: AssetService;
  meta?: {
    middleware_hostname?: string;
    local_ip_address?: string;
    camera_access_key?: string;
    [key: string]: any;
  };
}

export interface AssetsResponse {
  count: number;
  next?: string;
  previous?: string;
  results: AssetData[];
}

export interface AvailabilityRecord {
  linked_id: string;
  linked_model: string;
  status: string;
  timestamp: string;
}

export interface AssetTransaction {
  id: string;
  asset: {
    id: string;
    name: string;
  };
  from_location: AssetLocationObject;
  to_location: AssetLocationObject;
  performed_by: {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    user_type: string;
  };
  created_date: string;
  modified_date: string;
}

export interface AssetBedModel {
  id: string;
  asset_object: AssetData;
  bed_object: BedModel;
  created_date: string;
  modified_date: string;
  meta: Record<string, any>;
  asset?: string;
  bed?: string;
}

export type AssetBedBody = Partial<AssetBedModel>;

type UserBareMinimum = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  user_type: string;
  last_login: string | undefined;
  read_profile_picture_url?: string;
  external_id: string;
};

export interface AssetServiceEdit {
  id: string;
  asset_service: AssetService;
  serviced_on: string;
  note: string;
  edited_on: string;
  edited_by: UserBareMinimum;
}
export interface AssetService {
  id: string;
  asset: {
    id: string;
    name: string;
  };
  serviced_on: string;
  note: string;
  edits: AssetServiceEdit[];
  created_date: string;
  modified_date: string;
}

export interface PatientAssetBed {
  asset: AssetData;
  bed: BedModel;
  patient?: any;
  meta?: Record<string, any>;
}

export interface AssetServiceUpdate {
  external_id: string;
  serviced_on: string;
  note: string;
}
