/// <reference types="vite/client" />
interface ImportMetaEnv {
    VITE_API_URL: string
    VITE_CF_ID: string
    VITE_CF_SECRET: string
}
interface ImportMeta {
    readonly env: ImportMetaEnv
}
