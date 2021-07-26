import {fireEvent, render} from '@testing-library/react';
import configureStore, {MockStore} from "redux-mock-store";
import LandingPageComponent from "./LandingPageComponent";
import React from "react";
import {Provider} from "react-redux";
import mockProductList from "../../../mocks/products";
import {StoreType} from "../../../types/common/CommonTypes";
import {BrowserRouter as Router} from "react-router-dom";
import NavbarComponent from "../../common/Navbar";

describe("Landing Page Component", () => {
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
            }
        })
    })

    const renderComponent = () => render(
        <Provider store={store}>
            <Router>
                <NavbarComponent/>
                <LandingPageComponent/>
            </Router>
        </Provider>
    );

    it("should render the component", () => {
        const {getByTestId, getByText} = renderComponent();
        expect(getByTestId("container-landing")).toBeTruthy();

        expect(getByTestId("navbar-main")).toBeTruthy();
        expect(getByTestId("nav-dropdown")).toBeTruthy();
        expect(getByText("Singapore")).toBeTruthy();

        // click to show dropdown containing MY, SG stores
        fireEvent.click(getByText("Singapore"));
        expect(getByTestId("dropdown-item-my")).toBeTruthy();
        expect(getByTestId("dropdown-item-sg")).toBeTruthy();
    })

    it("should load the list of products", () => {
        const {getByTestId} = renderComponent();
        expect(getByTestId('product-1')).toBeTruthy();
        expect(getByTestId('product-2')).toBeTruthy();
        expect(getByTestId('product-3')).toBeTruthy();
        expect(getByTestId('product-4')).toBeTruthy();
        expect(getByTestId('product-5')).toBeTruthy();
        expect(getByTestId('product-6')).toBeTruthy();
        expect(getByTestId('product-7')).toBeTruthy();
        expect(getByTestId('product-8')).toBeTruthy();
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
            <Provider store={store}>
                <Router>
                    <NavbarComponent/>
                    <LandingPageComponent/>
                </Router>
            </Provider>
        )
        // product with id:1 should revert to price of SGD 1248.00
        expect(getByText('SGD 1248.00')).toBeInTheDocument();
    })

})