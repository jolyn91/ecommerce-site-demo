import {call, fork, put, takeEvery} from "redux-saga/effects";
import {LandingPageActionTypes, setProducts} from "../actions/landingPageActions";
import * as settings from "../settings";

export function* getProducts_() {
    try {
        const endpoint = `${settings.DEMO_SERVER}/api/products`;
        const response = yield call(fetch, endpoint);
        const data = yield response.json();
        yield put(setProducts(data["products"]))
    } catch(e) {
        console.error("getProducts of landingPageSaga failed", e);
    }
}

export const request = (url: string, options: {method: string, body: any}) => {
    return fetch(url, options);
}

function* watchLanding() {
    yield takeEvery(LandingPageActionTypes.GET_PRODUCTS, getProducts_);
}

const landingPageSagas = [fork(watchLanding)];

export default landingPageSagas;