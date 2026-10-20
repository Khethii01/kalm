/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional base URL of the enquiry API. Defaults to same-origin "/api". */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
