import {ICheckoutReq, StoreType} from "../../types/common/CommonTypes";
import {IProduct} from "../../types/feature/LandingPageComponentTypes";

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
                storeId: process.env.REACT_APP_MY_STORE_ID,
                currency: 'MYR',
                token: process.env.REACT_APP_MY_API_KEY
            };
        case StoreType.SINGAPORE:
            return {
                storeId: process.env.REACT_APP_SG_STORE_ID,
                currency: 'SGD',
                token: process.env.REACT_APP_SG_API_KEY
            };
        default:
            return {
                storeId: process.env.REACT_APP_SG_STORE_ID,
                currency: 'SGD',
                token: process.env.REACT_APP_SG_API_KEY
            };
    }
}
