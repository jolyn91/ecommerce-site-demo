import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import {IState as LandingPageState, LandingPageReducer} from "./landingPageReducer";
import { IState as CommonState, CommonReducer} from "./commonReducer";
import { IState as ProductDetailsState, ProductDetailsReducer} from "./productDetailsReducer";

export interface IAppRootState {
  common: CommonState;
  landing: LandingPageState;
  productDetails: ProductDetailsState;
}

// combine all reducers
const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    common: CommonReducer,
    landing: LandingPageReducer,
    productDetails: ProductDetailsReducer,
  });

export default rootReducer;
