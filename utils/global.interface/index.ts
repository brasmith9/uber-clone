
export interface IOptions {
    logDirPath?: string,
    label?: string,
    debugMode?: boolean | undefined,
    environment?: string,
}

export interface IConsole {
    level: string,
    handleExceptions: boolean,
    format: any
}

export interface IFile {
    level: string,
    filename: string,
    handleExceptions: boolean,
    maxsize: number,
    maxFiles: number,
    format: any
}

export interface ICommonOptions {
    console: IConsole,
    file: IFile
}

export interface IApiResponse {
    status: string;
    message: string;
    data?: string;
}