import {Reducer} from "redux";
import {ICustomer, StoreType} from "../types/common/CommonTypes";
import {CommonActionTypes} from "../actions/commonActions";

export interface IState {
    store: StoreType;
    customer: ICustomer;
}

const initialState: IState = {
    store: StoreType.SINGAPORE,
    customer: {
        email: "john.doe@example.com",
        mobile_number: "91112222",
        full_name: "John Doe",
        first_name: "John",
        last_name: "Doe",
    }
}

const reducer: Reducer<IState> = (state = initialState, action) => {
    switch(action.type) {
        case CommonActionTypes.CHANGE_STORE:
            return {...state, store: action.payload};
        default:
            return state;
    }
}

export {reducer as CommonReducer}
