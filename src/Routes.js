import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./containers/NotFound"
import Login from "./containers/Login"

import Home from "./containers/Home";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/"><Home /></Route>
            <Route exact path="/login"><Login /></Route>
            <Route><NotFound /></Route>
        </Switch>
    );
}

export default Routes;