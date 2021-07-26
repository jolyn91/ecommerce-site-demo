import React from "react";
import configureStore, {MockStore} from "redux-mock-store";
import {StoreType} from "../../../types/common/CommonTypes";
import mockProductList from "../../../mocks/products";
import {fireEvent, render} from "@testing-library/react";
import {Provider} from "react-redux";
import {MemoryRouter, Route} from "react-router-dom";
import NavbarComponent from "../../common/Navbar";
import ProductDetailsComponent from "./ProductDetailsComponent";
import {ProductDetailsActionTypes} from "../../../actions/productDetailsActions";

describe("Product Details Component", () => {
    let store: MockStore;
    const mockStore = configureStore([]);

    beforeEach(() => {
        store = mockStore({
            router: {},
            common: {
                store: StoreType.SINGAPORE
            },
            landing: {
                products: mockProductList
            },
            productDetails: {
                loading: false,
                error: false
            }
        })
    })

    const renderComponent = () => (
        render(
            <MemoryRouter initialEntries={['product/1']}>
                <Provider store={store}>
                    <Route path='product/:productId'>
                        <NavbarComponent/>
                        <ProductDetailsComponent/>
                    </Route>
                </Provider>
            </MemoryRouter>
        )
    )

    it("should render the component", () => {
        const {getByTestId, getByText} = renderComponent();
        expect(getByTestId("container-product-details")).toBeTruthy();

        expect(getByTestId("navbar-main")).toBeTruthy();
        expect(getByTestId("nav-dropdown")).toBeTruthy();
        expect(getByText("Singapore")).toBeTruthy();

        // click to show dropdown containing MY, SG stores
        fireEvent.click(getByText("Singapore"));
        expect(getByTestId("dropdown-item-my")).toBeTruthy();
        expect(getByTestId("dropdown-item-sg")).toBeTruthy();
    })

    it("should load the relevant product", () => {

        const {getByText} = renderComponent();
        expect(getByText("Samsung Galaxy S21 5G")).toBeTruthy();
        const description = mockProductList[0].description;
        expect(getByText(description)).toBeTruthy();

    })

    it("should change pricing accordingly when store has been changed", () => {
        let currentStore = store.getState();

        // start with MY store
        store = mockStore({
            ...currentStore,
            common: {
                store: StoreType.MALAYSIA
            }
        })
        const {getByText, rerender} = renderComponent();
        // product with id:1 has price of 1248.00
        // For MY, 1248.00 * 3.1 = 3868.8
        expect(getByText('MYR 3868.80')).toBeInTheDocument();

        // change to SG store
        currentStore = store.getState();
        store = mockStore({
            ...currentStore,
            common: {
                store: StoreType.SINGAPORE
            }
        })

        rerender(
            <MemoryRouter initialEntries={['product/1']}>
                <Provider store={store}>
                    <Route path='product/:productId'>
                        <NavbarComponent/>
                        <ProductDetailsComponent/>
                    </Route>
                </Provider>
            </MemoryRouter>
        )
        // product with id:1 should revert to price of SGD 1248.00
        expect(getByText('SGD 1248.00')).toBeInTheDocument();
    })

    it("should fire action to checkout when checkout button is clicked", () => {
        const {getByText} = renderComponent();
        expect(getByText("Checkout with Ablr")).toBeTruthy();
        fireEvent.click(getByText("Checkout with Ablr"));
        expect(store.getActions()).toEqual([{
            type: ProductDetailsActionTypes.CHECKOUT,
            payload: mockProductList[0],
            meta: undefined,
            error: undefined
        }])
    })

    it("if checkout fails, it should show error toast on screen", () => {
        let currentStore = store.getState();

        store = mockStore({
            ...currentStore,
            productDetails: {
                loading: false,
                error: true
            }
        })
        const {getByTestId, getByText} = renderComponent();
        expect(getByTestId("error-toast")).toBeTruthy();
        expect(getByText("Something went wrong...")).toBeTruthy();
    })

})