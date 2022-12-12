import winston from 'winston';
import { exec, ExecException } from 'child_process';

/**
 * Class for customizing errors.
 */
class HttpException extends Error {
  public statusCode: number;
  public message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

/**
 * Subscribes to unhandled errors that occurs outside APIs
 * and logs it when it occurs also it restarts the server.
 *
 */
const errorSubscriber = (
  errorName: 'unhandledRejection' | 'uncaughtException'
) => {
  process.on(errorName, (ex: ExecException) => {
    console.log(`RESTARTING ${errorName}:${ex}`);

    //logs errors to a log file
    winston.error(ex.message, {
      action: 'restart',
      statusCode: 500,
      stack: ex.stack
    });

    exec(`pm2 restart <${process.pid}>`);
  });
};

export { HttpException, errorSubscriber };
