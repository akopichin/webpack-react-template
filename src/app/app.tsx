import * as React from 'react';
import * as ReactDOM from "react-dom";

import {appStore} from './Store';

interface IProps {
    name: string;
}

console.log(appStore.getState());

class Hello extends React.Component<IProps, void> {
  render() {
    return <div>Hello, {this.props.name}</div>;
  }
}

ReactDOM.render(
  <Hello name="World" />,
  document.getElementById("app")
);