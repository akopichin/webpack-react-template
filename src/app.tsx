import * as React from 'react';
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as Promise from 'bluebird';

// Import statics.
import './assets/index.html';
import './styles/app.scss';

// Polyfill the Promise.
if (window.Promise === undefined) {
    window.Promise = Promise;
}

import {appStore} from './Store';
import {Hello} from 'Modules/Sample/Components/Hello';

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