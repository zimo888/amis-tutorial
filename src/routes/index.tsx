import * as React from 'react';

import { Route, Switch, Redirect, BrowserRouter as Router } from "react-router-dom";
import HomePage from '../pages/HomePage'

export default class Routes extends React.Component{
    render(){
        return  (<Router basename="">
                    <Switch>
                        <Redirect to={`/home/helloworld`} from={`/`} exact />
                        <Route path="/home"  component={HomePage} />
                        <Route path="*" exact component={HomePage} />
                    </Switch>
                </Router>)
    }
}
