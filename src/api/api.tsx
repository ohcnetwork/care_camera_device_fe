import { OperationAction } from "@/hooks/useOperateCamera";
import {
  CameraPreset,
  GetPresetsResponse,
  GetStatusResponse,
  GetStreamTokenResponse,
} from "../types";

/**
 * A fake function that returns an empty object casted to type T
 * @returns Empty object as type T
 */
export function Type<T>(): T {
  return {} as T;
}

export interface PaginatedResponse<TItem> {
  count: number;
  next: string | null;
  previous: string | null;
  results: TItem[];
}

const routes = {
  operateAsset: {
    path: "/api/v1/asset/{id}/operate_assets/",
    method: "POST",
    TRes: Type<
      GetStreamTokenResponse | GetStatusResponse | GetPresetsResponse
    >(),
    TBody: Type<{ action: OperationAction }>(),
  },

  listAssetBedPresets: {
    path: "/api/v1/assetbed/{assetbed_id}/camera_presets/",
    method: "GET",
    TRes: Type<PaginatedResponse<CameraPreset>>(),
  },
  listAssetPresets: {
    path: "/api/v1/asset/{asset_id}/camera_presets/",
    method: "GET",
    TRes: Type<PaginatedResponse<CameraPreset>>(),
  },
  listBedPresets: {
    path: "/api/v1/bed/{bed_id}/camera_presets/",
    method: "GET",
    TRes: Type<PaginatedResponse<CameraPreset>>(),
  },
  createPreset: {
    path: "/api/v1/assetbed/{assetbed_id}/camera_presets/",
    method: "POST",
    TRes: Type<CameraPreset>(),
    TBody: Type<WritableOnly<CameraPreset>>(),
  },
  updatePreset: {
    path: "/api/v1/assetbed/{assetbed_id}/camera_presets/{id}/",
    method: "PATCH",
    TRes: Type<CameraPreset>(),
    TBody: Type<Partial<WritableOnly<CameraPreset>>>(),
  },
  deletePreset: {
    path: "/api/v1/assetbed/{assetbed_id}/camera_presets/{id}/",
    method: "DELETE",
    TRes: Type<CameraPreset>(),
  },
} as const;

export default routes;

/**
 * A utility type that makes all properties of `T` writable recursively.
 * If a property was originally `readonly`, it becomes optional.
 * Otherwise, it remains required.
 */
export type Writable<T> = T extends object
  ? {
      [P in keyof T as IfEquals<
        { [Q in P]: T[P] },
        { -readonly [Q in P]: T[P] },
        never,
        P
      >]?: undefined;
    } & {
      [P in keyof T as IfEquals<
        { [Q in P]: T[P] },
        { -readonly [Q in P]: T[P] },
        P,
        never
      >]: T[P] extends object ? Writable<T[P]> : T[P];
    }
  : T;

/**
 * A utility type that includes only the non-readonly properties of `T` recursively.
 * Or in other words, excludes all `readonly` properties.
 */
export type WritableOnly<T> = T extends object
  ? {
      [P in keyof T as IfEquals<
        { [Q in P]: T[P] },
        { -readonly [Q in P]: T[P] },
        P
      >]: T[P] extends object ? WritableOnly<T[P]> : T[P];
    }
  : T;

type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? A
  : B;

export type Time = `${number}:${number}`;
