import { PapertrailConnection, PapertrailTransport } from 'winston-papertrail';
import helmet from 'helmet';


declare module 'winston-papertrail';
declare module 'helmet';

export { PapertrailConnection, PapertrailTransport, helmet }