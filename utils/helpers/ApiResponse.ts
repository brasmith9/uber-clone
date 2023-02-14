import BaseApiResponse from "./BaseApiResponse";
import { IApiResponse } from "../global.interface";


class ApiResponse{
    static _status: string;
    static _data: any;
    static _message: string;

    constructor (response: IApiResponse) {
        ApiResponse._message = response.message;
        ApiResponse._status = response.status;
        ApiResponse._data = response.data;
    }

    static format(): IApiResponse {
        return {
           message: this._message,
           status: this._status,
           data: this._data
        }
    }
}

export default ApiResponse;