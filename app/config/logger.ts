/* istanbul ignore file */
import winston from 'winston';
import fs from 'fs';
import config from './env';
import { ICommonOptions, IConsole, IOptions } from '../../utils/global.interface';
import { FileTransportInstance } from 'winston/lib/winston/transports';

const { combine, label, timestamp, colorize, printf } = winston.format;
const { rootPath, NODE_ENV } = config;


class Logger {

    private readonly logDir: string;
    private readonly label: string;
    private readonly _commonOptions: ICommonOptions;
    private readonly debugMode: boolean | undefined;
    private readonly environment: string;

    constructor(options: IOptions) {
        this.logDir = options.logDirPath || `${rootPath}/logs`;
        this.label = options.label || 'log';
        this._commonOptions = {
          console: {
            level: 'debug',
            handleExceptions: true,
            format: combine(
              colorize({ all: true }),
              printf(
                (msg) => `[${new Date(msg.timestamp).toUTCString()}]: ${msg.label} : - ${msg.level
                }: ${msg.message}`
              )
            )
          },
          file: {
            level: 'debug',
            filename: `${this.logDir}/app.log`,
            handleExceptions: true,
            maxsize: 5242880,
            maxFiles: 2000,
            format: winston.format.json()
          }
        };
        this.debugMode = options.debugMode === true || options.debugMode === undefined;
        this.environment = NODE_ENV || 'development';
      }

      private _getTransports() {
        const { console, file } = this._commonOptions;
        let level = this.debugMode ? 'debug' : 'info';
        if (this.environment === 'production' && this.debugMode) level = 'error';
        const consoleOpt = { ...console, level };
        const fileOpt = {
          ...file,
          filename: `${this.logDir}/app.${this.environment}.log`
        };
        return this.getLogToProcess(this.environment, fileOpt, consoleOpt);
      }

      private getLogToProcess (env, fileOpt, consoleOpt) {
        const array: any[] = [];
        if (env === 'development' || env === 'test') {
          array.push(
            new winston.transports.File(fileOpt),
            new winston.transports.Console(consoleOpt)
          );
          return array;
        }
        array.push(new winston.transports.File(fileOpt),
          new winston.transports.Console(consoleOpt));
        return array;
      };

      private init() {
        if (!fs.existsSync(this.logDir)) fs.mkdirSync(this.logDir);
        const logger = winston.createLogger({
          format: combine(
            timestamp(),
            label({
              label: this.label
            })
          ),
          transports: this._getTransports(),
          exitOnError: false
        });
        return logger;
      }
    

      static createLogger(options: IOptions): winston.Logger {
        const loggerInstance = new Logger(options);
        return loggerInstance.init()
      }
}

export default Logger;