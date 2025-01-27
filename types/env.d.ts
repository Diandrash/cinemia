declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_API_KEY: string;
      EXPO_PUBLIC_ACCOUNT_ID: string;
      EXPO_PUBLIC_BASE_URL: string;
      EXPO_PUBLIC_IMAGE_URL: string;
    }
  }

  interface ImportMeta {
    env: any;
  }
}

export {};
