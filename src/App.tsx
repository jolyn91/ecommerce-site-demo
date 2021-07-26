import React from "react";
import "./App.scss";
import {Switch, Route} from "react-router-dom";
import NavbarComponent from "./components/common/Navbar";
import LandingPageComponent from "./components/feature/landing/LandingPageComponent";
import ProductDetailsComponent from "./components/feature/product-details/ProductDetailsComponent";

const App = () => {
    return (
        <>
            <NavbarComponent/>
            <Switch>
                <Route exact path="/" component={LandingPageComponent}/>
                <Route path="/product/:productId" component={ProductDetailsComponent}/>
            </Switch>
        </>
    );
}

export default App;
