import React from "react";
import AppRoute from "./approute";
import {BrowserRouter as Router, Switch} from "react-router-dom";
import defaultLayout from "../hoc/layout/defaultLayout";
import PageNotFound from "../pages/404/pageNotFound";
import notFoundLayout from "../hoc/layout/notFoundLayout";
import HomePage from "../pages/homePage/HomePage"
import registerLayout from "../hoc/layout/registerLayout";
import RegisterAsCompany from "../pages/registration/registerAsCompany";
import RegisterAsCourier from "../pages/registration/registerAsCourier";


export default function Routes() {
    return (
        <>
            <Router>
                <Switch>
                    <AppRoute exact path="/" layout={defaultLayout} component={HomePage}/>
                    <AppRoute path="/register/company" layout={registerLayout} component={RegisterAsCompany}/>
                    <AppRoute path="/register/courier" layout={registerLayout} component={RegisterAsCourier}/>
                    <AppRoute path="*" layout={notFoundLayout} component={PageNotFound}/>
                </Switch>
            </Router>
        </>


    )
}