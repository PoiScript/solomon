/// <reference types="@cloudflare/workers-types" />
/// <reference types="vite/client" />
/// <reference types="./pkg/solomon.js" />

declare const SOLOMON_WSAM: WebAssembly.Module;
declare const SOLOMON_KV: KVNamespace;
declare const WASM_BINDGEN_SCRIPT: any;
