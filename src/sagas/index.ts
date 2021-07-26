import { all } from "redux-saga/effects";
import landingPageSagas from "./landingPageSaga";
import productDetailSagas from "./productDetailsSaga";

export default function* rootSaga() {
    yield all([
        ...landingPageSagas,
        ...productDetailSagas,
    ]);
}