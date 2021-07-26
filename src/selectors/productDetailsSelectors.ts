import { IAppRootState } from "../reducers";
import { createSelector } from "reselect";

const loadingSelector = (state: IAppRootState) => state.productDetails.loading;
const errorSelector = (state: IAppRootState) => state.productDetails.error;

export const getLoadingSelector = createSelector(
    loadingSelector,
    (data) => data
)

export const getErrorSelector = createSelector(
    errorSelector,
    (data) => data
)