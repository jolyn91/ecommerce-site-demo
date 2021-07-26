import { Reducer } from "redux";
import {IProduct} from "../types/feature/LandingPageComponentTypes";
import {LandingPageActionTypes} from "../actions/landingPageActions";

export interface IState {
    products: IProduct[];
}

const initialState: IState = {
    products: []
}

const reducer: Reducer<IState> = (state = initialState, action) => {
    switch(action.type) {
        case LandingPageActionTypes.SET_PRODUCTS:
            return {...state, products: action.payload};
        default:
            return state;
    }
}

export {reducer as LandingPageReducer};