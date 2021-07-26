import {ICheckoutReq, StoreType} from "../../types/common/CommonTypes";
import {IProduct} from "../../types/feature/LandingPageComponentTypes";
import {config} from "../../config";
import {ReactEnv} from "../../settings";

export const getProductPrice = (store: StoreType, price: string): string => {
    switch (store) {
        case StoreType.MALAYSIA:
            const price_new = (Number(price) * 3.1).toFixed(2);
            return `MYR ${price_new}`;
        case StoreType.SINGAPORE:
            return `SGD ${price}`;
        default:
            return `SGD ${price}`;
    }
}

export const getProduct = (id: number, products: IProduct[]): IProduct => {
    return products.find(prod => prod.id === id) || products[0];
}

export const getCheckoutDetails = (store: StoreType): ICheckoutReq => {
    switch (store) {
        case StoreType.MALAYSIA:
            return {
                storeId: process.env.NODE_ENV === ReactEnv.PROD ? process.env.MY_STORE_ID : config.MY.STORE_ID,
                currency: 'MYR',
                token: process.env.NODE_ENV === ReactEnv.PROD ? process.env.MY_API_KEY : config.MY.API_KEY
            };
        case StoreType.SINGAPORE:
            return {
                storeId: process.env.NODE_ENV === ReactEnv.PROD ? process.env.SG_STORE_ID : config.SG.STORE_ID,
                currency: 'SGD',
                token: process.env.NODE_ENV === ReactEnv.PROD ? process.env.SG_API_KEY : config.SG.API_KEY
            };
        default:
            return {
                storeId: process.env.NODE_ENV === ReactEnv.PROD ? process.env.SG_STORE_ID : config.SG.STORE_ID,
                currency: 'SGD',
                token: process.env.NODE_ENV === ReactEnv.PROD ? process.env.SG_API_KEY : config.SG.API_KEY
            };
    }
}
