import { Reducer } from "redux";
import {ProductDetailsActionTypes} from "../actions/productDetailsActions";

export interface IState {
    loading: boolean;
    error: boolean;
}

const initialState: IState = {
    loading: false,
    error: false
}

const reducer: Reducer<IState> = (state = initialState, action) => {
    switch(action.type) {
        case ProductDetailsActionTypes.LOADING_CHECKOUT:
            return {...state, loading: action.payload}
        case ProductDetailsActionTypes.SHOW_TOAST_ERROR:
            return {...state, error: action.payload}
        default:
            return state;
    }
}

export {reducer as ProductDetailsReducer};