/* tslint:disable:empty-lines-imports */
import 'Core/bootstrap';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {AsyncComponentLoader} from 'Core/Components/AsyncComponentLoader';
import {ErrorBoundary} from 'Core/Components/ErrorBoundary';
import './assets/index.html';
import './styles/app.scss';
import {appStore} from './Store';

appStore.subscribe(() =>
    console.log('new state:', appStore.getState())
);

ReactDOM.render(
    <Provider store={appStore}>
        <Router>
            <ErrorBoundary>
                <Route component={() => (<AsyncComponentLoader bundle={import(/* webpackChunkName: "Hello" */'Modules/Sample/Components/Hello')} isModal={false}/>)} />
            </ErrorBoundary>
        </Router>
    </Provider>,
    document.getElementById('app')
);
