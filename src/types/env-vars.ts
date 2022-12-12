export {};

declare global {
  interface ProcessEnv {
    PORT: string | undefined;
    NODE_ENV: 'test' | 'development' | 'production';
    PGUSER: string;
    PGPASSWORD: string;
    PGDATABASE: string;
    PGHOST: string;
    JWT_SECRET: string;
  }
}
