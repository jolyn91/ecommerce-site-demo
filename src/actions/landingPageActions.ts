import { action } from "typesafe-actions";
import {IProduct} from "../types/feature/LandingPageComponentTypes";

export enum LandingPageActionTypes {
    GET_PRODUCTS = "LANDING/GET_PRODUCTS",
    SET_PRODUCTS = "LANDING/SET_PRODUCTS"
}

export const getProducts = () => action(LandingPageActionTypes.GET_PRODUCTS);
export const setProducts = (products: IProduct[]) => action(LandingPageActionTypes.SET_PRODUCTS, products);