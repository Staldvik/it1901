import React from 'react';
import { Switch, Route } from 'react-router-dom';

import App from './App';
import About from './components/about';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/about" component={About}/>
    </Switch>
);

export default Routes;