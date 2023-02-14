import { json } from "body-parser";
import { Application } from "express";
// import { helmet } from "../../modules";
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import * as OpenApiValidator from 'express-openapi-validator';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import mongoose from 'mongoose';
import uberCloneApiRoutes from '../routes';
import config from './env'
import apiMessages from "../../utils/contants/api.messages";

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  };

const docOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Uber Clone API",
            version: "1.0.0",
            description: "Uber Clone APIs",
        },
        servers: [
            {
                url: "http://localhost:8000",
            },
        ],
    },
    apis: ["../routes/*.ts"],
}


const specs = swaggerJSDoc(docOptions);
class App {
    private _port: String = config.PORT ?? '6789';
    private _app: Application;
    private _logger: any;

    constructor(app: Application,logger: any) {
        this._app = app;
        this._logger = logger;
    }

    public async init (): Promise<void> {
        this.setupExpress();
        await this.docsSetup();
        await this.run();

    }

    private setupExpress(): void {
        this._app.use(json());
        this._app.use(cors());
        // this._app.use(helmet());
        this._app.use(morgan('combined', {}));
        this._app.get('/', (_, res) => res.json({message: apiMessages.WELCOME_MESSAGE}));
        this._app.use(apiMessages.V1, uberCloneApiRoutes);
        this._app.use((_, __, next) => {
            next(apiMessages.NOT_FOUND_API)
        })

    }

  private async docsSetup(): Promise<void> {
    this._app.use(`${apiMessages.V1}/docs`, swaggerUi.serve, swaggerUi.setup(specs));
    this._app.use(
      OpenApiValidator.middleware({
        apiSpec: specs as OpenAPIV3.Document,
        validateRequests: true,
        validateResponses: true,
      })
    );
  }

    private setupControllers(): void {
        // this.addControllers([])
    }

    private async run (): Promise<void> {
        mongoose.connect(config.DATABASE_URL ?? process.env.UBER_CLONE_DB ?? '', dbOptions).then(() => {
            this._logger.info('🚀 Database connected');
            this._app.listen(this._port, () => {
                this._logger.info(`🚀🚀 Server ready at http://localhost:${this._port}${apiMessages.V1}`);
            });
        }).catch((error: any) => {
            this._logger.error(error.message);
            process.exit(1);
        })
    }
}

export default App;