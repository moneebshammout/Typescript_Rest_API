export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string | undefined;
      NODE_ENV: 'test' | 'development' | 'production';
    }
  }
}
