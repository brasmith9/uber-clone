import express, { Express } from "express";
import App from "./app/config";
import Logger from "./app/config/logger";

const logger: any = Logger.createLogger({ label: 'UBER_CLONE'})



const app: Express = express();
const port = '3000';


(async (): Promise<any> => {
    try {
        const _ = new App(app, logger);
        await _.init();

    } catch (error: any) {
        logger.error(error.mesage);
        process.exit(1);
    }
})();
