import { IAppRootState } from "../reducers";
import { createSelector } from "reselect";

const storeSelector = (state: IAppRootState) => state.common.store;
const customerSelector = (state: IAppRootState) => state.common.customer;

export const getStoreSelector = createSelector(
    storeSelector,
    (data) => data
)

export const getCustomerSelector = createSelector(
    customerSelector,
    (data) => data
)