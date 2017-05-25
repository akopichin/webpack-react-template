import * as React from 'react';
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import {appStore} from './Store';
//import {AppActions} from './Modules/Sample/Actions/actions';
import {Hello} from 'app/Modules/Sample/Components/Hello';

console.log(appStore.getState());

appStore.subscribe(() =>
    console.log('new state:', appStore.getState())
);

ReactDOM.render(
    <Provider store={appStore}>
        <Router>
            <Route component={Hello} />
        </Router>
    </Provider>,
    document.getElementById("app")
);