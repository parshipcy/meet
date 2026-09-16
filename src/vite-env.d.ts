/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly ZEGOCLOUD_ID: string;
    readonly ZEGOCLOUD_SERVER_SECRET: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
