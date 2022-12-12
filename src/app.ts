require('express-async-errors');
import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import winston from 'winston';
import errorMiddleware from '@middleware/error-handler';
import { errorSubscriber } from '@utils/errors';
import appRouter from '@routes/index';
import { sequelize } from '@models/index';
import { establishRedisConnection } from '@utils/redis';
class App {
  public express: Express;
  public port: string | undefined;

  constructor(port: string | undefined) {
    this.express = express();
    this.port = port;
    establishRedisConnection();
    this.initializeErrorHandling();
    this.initializeMiddleware();
    this.initializeErrorMiddleWare();
  }

  /**
   * Create a error log file then subscribes to errors.
   */
  private initializeErrorHandling(): void {
    winston.add(new winston.transports.File({ filename: 'error-logs.log' }));
    errorSubscriber('unhandledRejection');
    errorSubscriber('uncaughtException');
  }

  private initializeMiddleware(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(appRouter);
  }

  private initializeErrorMiddleWare(): void {
    this.express.use(errorMiddleware);
  }

  public listen(): void {
    this.express.listen(this.port, async (): Promise<void> => {
      await sequelize.sync();
      console.log(`Server listening on http://localhost:${this.port}`);
    });
  }
}

export default App;
