const proxy = 'https://frozen-stream-07838.herokuapp.com'; // for CORS: https://github.com/Rob--W/cors-anywhere/

let DEMO_SERVER_VAL: string = `${proxy}/https://demo.ablr.com`;
let DEMO_SERVER_NO_PROXY_VAL: string = `https://demo.ablr.com`;

let API_SERVER_VAL: string;

export enum ReactEnv {
    PROD = "production",
    DEV = "development"
}

switch (process.env.NODE_ENV) {
    case ReactEnv.DEV:
        API_SERVER_VAL = `${proxy}/https://api.uat.ablr.com`;
        break;
    case ReactEnv.PROD:
        API_SERVER_VAL = `${proxy}/https://api.uat.ablr.com`;
        break;
    default:
        API_SERVER_VAL = `${proxy}/https://api.uat.ablr.com`;
        break;
}

export const API_SERVER = API_SERVER_VAL;
export const DEMO_SERVER = DEMO_SERVER_VAL;
export const DEMO_SERVER_NO_PROXY = DEMO_SERVER_NO_PROXY_VAL;
