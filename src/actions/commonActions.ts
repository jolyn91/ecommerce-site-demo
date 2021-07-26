import { action } from "typesafe-actions";
import {StoreType} from "../types/common/CommonTypes";

export enum CommonActionTypes {
    CHANGE_STORE = "COMMON/CHANGE_STORE"
}

export const changeStore = (store: StoreType) => action(CommonActionTypes.CHANGE_STORE, store)