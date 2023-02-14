import rootPath from 'app-root-path'
import development from "./development";
import production from "./production";
import test from "./test";

const PORT: string | undefined = process.env.UBER_CLONE_PORT;

const {
    UBER_CLONE_NODE_ENV: NODE_ENV, UBER_CLONE_SECRET_KEY: SECRET_KEY
} = process.env;

const currentEnv: ICurrentEnv | undefined = {
    development,
    test,
    production
  }[NODE_ENV || 'development'];

export default {
    ...process.env,
    ...currentEnv,
    rootPath,
    NODE_ENV,
    SECRET_KEY,
    PORT
}

interface ICurrentEnv {
    DATABASE_URL: string | undefined;
}