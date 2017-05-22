import * as React from 'react';
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import {appStore} from './Store';
import {AppActions} from './Actions/actions';
//import {EItemsFilter} from './Models/EItemsFilter';

console.log(appStore.getState());

appStore.subscribe(() =>
    console.log('new state:', appStore.getState())
);

appStore.dispatch(AppActions.loadList());

class Hello extends React.Component<void, void> {
    render() {
        return (
            <div>Hello</div>
        )
    }
}

ReactDOM.render(
    <Provider store={appStore}>
        <Router>
            <Route component={Hello} />
        </Router>
    </Provider>,
    document.getElementById("app")
);