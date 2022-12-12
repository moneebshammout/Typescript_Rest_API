export {};

declare global {
  interface ProcessEnv {
    PORT: string | undefined;
    NODE_ENV: 'test' | 'development' | 'production';
  }
}
