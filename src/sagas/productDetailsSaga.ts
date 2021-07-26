import {call, fork, takeEvery, put, select} from "redux-saga/effects";
import * as settings from "../settings";
import {request} from "./landingPageSaga";
import {loadingCheckout, ProductDetailsActionTypes, showToastError} from "../actions/productDetailsActions";
import {getCustomerSelector, getStoreSelector} from "../selectors/commonSelectors";
import {getCheckoutDetails} from "../utils/common/commonUtils";
import {ICheckoutReq} from "../types/common/CommonTypes";
import {ICheckoutResponse} from "../types/feature/ProductDetailsTypes";

export function* doCheckout_() {
    try {
        yield put(loadingCheckout(true));
        const endpoint = `${settings.API_SERVER}/merchant/v1/checkouts/`;
        const store = yield select(getStoreSelector);
        const customer = yield select(getCustomerSelector);
        const checkoutReqData: ICheckoutReq = getCheckoutDetails(store);

        const requestBody = {
            "store": checkoutReqData.storeId,
            "amount": 123450,
            "currency": checkoutReqData.currency,
            ...customer
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${checkoutReqData.token}`
            },
            body: JSON.stringify(requestBody)
        }

        const response = yield call(request, endpoint, options);
        const data: ICheckoutResponse = yield response.json();
        console.log('data', data);

        window.location.href = data.checkout_url;
    } catch (e) {
        console.error('error checking out', e);
        yield put(showToastError(true));
    } finally {
        // reset values
        yield put(loadingCheckout(false));
        yield put(showToastError(false));
    }
}

function* watchProductDetails() {
    yield takeEvery(ProductDetailsActionTypes.CHECKOUT, doCheckout_);
}

const productDetailSagas = [fork(watchProductDetails)];

export default productDetailSagas;