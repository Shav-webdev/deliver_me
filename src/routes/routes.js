import React from "react";
import AppRoute from "./approute";
import {BrowserRouter as Router, Switch} from "react-router-dom";
import defaultLayout from "../hoc/layout/defaultLayout/defaultLayout";
import PageNotFound from "../pages/404/pageNotFound";
import notFoundLayout from "../hoc/layout/notFoundLayout";
import HomePage from "../pages/homePage/HomePage"
import registerLayout from "../hoc/layout/registerLayout/registerLayout";
import {WrappedRegisterAsCompany} from "../pages/registration/registerAsCompany/registerAsCompany";
import {WrappedRegisterAsCourier} from "../pages/registration/registerAsCourier";


export default function Routes() {
    return (
        <>
            <Router>
                <Switch>
                    <AppRoute exact path="/" layout={defaultLayout} component={HomePage}/>
                    <AppRoute path="/register/company" layout={registerLayout} component={WrappedRegisterAsCompany}/>
                    <AppRoute path="/register/courier" layout={registerLayout} component={WrappedRegisterAsCourier}/>
                    <AppRoute path="*" layout={notFoundLayout} component={PageNotFound}/>
                </Switch>
            </Router>
        </>


    )
}