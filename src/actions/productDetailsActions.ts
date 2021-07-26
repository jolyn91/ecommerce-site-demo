import { action } from "typesafe-actions";
import {IProduct} from "../types/feature/LandingPageComponentTypes";

export enum ProductDetailsActionTypes {
    CHECKOUT = "PRODUCT/CHECKOUT",
    LOADING_CHECKOUT = "PRODUCT/LOADING_CHECKOUT",
    SHOW_TOAST_ERROR = "PRODUCT/SHOW_TOAST_ERROR",
}

export const doCheckout = (product: IProduct) => action(ProductDetailsActionTypes.CHECKOUT, product);
export const loadingCheckout = (loading: boolean) => action(ProductDetailsActionTypes.LOADING_CHECKOUT, loading);
export const showToastError = (show: boolean) => action(ProductDetailsActionTypes.SHOW_TOAST_ERROR, show)