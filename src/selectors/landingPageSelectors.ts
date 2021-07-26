import { IAppRootState } from "../reducers";
import { createSelector } from "reselect";

const productsSelector = (state: IAppRootState) => state.landing.products;

export const getProductsSelector = createSelector(
    productsSelector,
    (data) => data
);