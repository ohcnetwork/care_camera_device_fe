import { Dispatch, SetStateAction } from "react";

type QueryParamValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Array<string | number | boolean | null | undefined>;

export type QueryParams = Record<string, QueryParamValue>;

interface RouteBase<TData> {
  path: string;
  TRes: TData;
  noAuth?: boolean;
}

export interface QueryRoute<TData, TBody = unknown> extends RouteBase<TData> {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  TBody?: TBody;
}

export interface MutationRoute<TData, TBody> extends RouteBase<TData> {
  method: "POST" | "PUT" | "PATCH" | "DELETE";
  TBody?: TBody;
}

export type Route<TData, TBody> =
  | QueryRoute<TData, TBody>
  | MutationRoute<TData, TBody>;

export interface RequestResult<TData> {
  res: Response | undefined;
  data: TData | undefined;
  error: undefined | Record<string, unknown>;
}

export interface RequestOptions<TData = unknown, TBody = unknown> {
  query?: QueryParams;
  body?: TBody;
  pathParams?: Record<string, string | number>;
  onResponse?: (res: RequestResult<TData>) => void;
  silent?: boolean;
}

export interface APICallOptions<TBody = unknown> {
  pathParams?: Record<string, string | number>;
  queryParams?: QueryParams;
  body?: TBody;
  silent?: boolean;
  signal?: AbortSignal;
  headers?: HeadersInit;
}

export interface PaginatedResponse<TItem> {
  count: number;
  next: string | null;
  previous: string | null;
  results: TItem[];
}

type Options<TData, TBody> = RequestOptions<TData, TBody> & {
  signal?: AbortSignal;
};

/**
 * @deprecated use useQuery/useMutation/callApi instead
 */
export default async function request<TData, TBody>(
  { path, method, noAuth }: Route<TData, TBody>,
  { query, body, pathParams, onResponse, signal }: Options<TData, TBody> = {}
): Promise<RequestResult<TData>> {
  const url = `https://careapi.ohc.network${makeUrl(path, query, pathParams)}`;

  const options: RequestInit = { method, signal };

  if (body) {
    options.body = JSON.stringify(body);
  }

  let result: RequestResult<TData> = {
    res: undefined,
    data: undefined,
    error: undefined,
  };

  options.headers = makeHeaders(noAuth ?? false);

  try {
    const res = await fetch(url, options);

    const data = await getResponseBody<TData>(res);

    result = {
      res,
      data: res.ok ? data : undefined,
      error: res.ok ? undefined : (data as Record<string, unknown>),
    };

    onResponse?.(result);
    console.log(result);

    return result;
  } catch (error: any) {
    result = { error, res: undefined, data: undefined };
    if (error.name === "AbortError") {
      return result;
    }
  }

  console.error(`Request failed `, result.error);
  return result;
}

export async function getResponseBody<TData>(res: Response): Promise<TData> {
  if (!(res.headers.get("content-length") !== "0")) {
    return null as TData;
  }

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const isImage = res.headers.get("content-type")?.includes("image");

  if (isImage) {
    return (await res.blob()) as TData;
  }

  if (!isJson) {
    return (await res.text()) as TData;
  }

  try {
    return await res.json();
  } catch {
    return (await res.text()) as TData;
  }
}

export function makeUrl(
  path: string,
  query?: QueryParams,
  pathParams?: Record<string, string | number>
) {
  if (pathParams) {
    path = Object.entries(pathParams).reduce(
      (acc, [key, value]) => acc.replace(`{${key}}`, `${value}`),
      path
    );
  }

  ensurePathNotMissingReplacements(path);

  if (query) {
    path += `?${makeQueryParams(query)}`;
  }

  return path;
}

const makeQueryParams = (query: QueryParams) => {
  const qParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined) return;

    if (Array.isArray(value)) {
      value.forEach((v) => qParams.append(key, `${v}`));
      return;
    }

    qParams.set(key, `${value}`);
  });

  return qParams.toString();
};

const ensurePathNotMissingReplacements = (path: string) => {
  const missingParams = path.match(/\{.*\}/g);

  if (missingParams) {
    const msg = `Missing path params: ${missingParams.join(
      ", "
    )}. Path: ${path}`;
    console.error(msg);
    throw new Error(msg);
  }
};

export function makeHeaders(noAuth: boolean, additionalHeaders?: HeadersInit) {
  const headers = new Headers(additionalHeaders);

  headers.set("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  const authorizationHeader = getAuthorizationHeader();
  if (authorizationHeader && !noAuth) {
    headers.append("Authorization", authorizationHeader);
  }

  return headers;
}

export function getAuthorizationHeader() {
  const accessToken = localStorage.getItem("care_access_token");

  if (accessToken) {
    return `Bearer ${accessToken}`;
  }

  return null;
}

export function mergeRequestOptions<TData>(
  options: RequestOptions<TData>,
  overrides: RequestOptions<TData>
): RequestOptions<TData> {
  return {
    ...options,
    ...overrides,

    query: { ...options.query, ...overrides.query },
    body: (options.body || overrides.body) && {
      ...(options.body ?? {}),
      ...(overrides.body ?? {}),
    },
    pathParams: { ...options.pathParams, ...overrides.pathParams },

    onResponse: (res) => {
      options.onResponse?.(res);
      overrides.onResponse?.(res);
    },
    silent: overrides.silent ?? options.silent,
  };
}

export function handleUploadPercentage(
  event: ProgressEvent,
  setUploadPercent: Dispatch<SetStateAction<number>>
) {
  if (event.lengthComputable) {
    const percentComplete = Math.round((event.loaded / event.total) * 100);
    setUploadPercent(percentComplete);
  }
}
