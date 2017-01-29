import * as React from 'react';
import * as ReactDOM from "react-dom";

import {appStore} from './Store';
import {AppActions} from './Actions/actions';
//import {EItemsFilter} from './Models/EItemsFilter';

interface IProps {
    name: string;
}

console.log(appStore.getState());

appStore.subscribe(() =>
    console.log('new state:', appStore.getState())
);

appStore.dispatch(AppActions.loadList());

class Hello extends React.Component<IProps, void> {
  render() {
    return <div>Hello, {this.props.name}</div>;
  }
}

ReactDOM.render(
  <Hello name="World" />,
  document.getElementById("app")
);