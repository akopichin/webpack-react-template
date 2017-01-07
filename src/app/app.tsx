import * as React from 'react';
import * as ReactDOM from "react-dom";

interface IProps {
    name: string;
}

class Hello extends React.Component<IProps, void> {
  render() {
    return <div>Hello, {this.props.name}</div>;
  }
}

ReactDOM.render(
  <Hello name="World" />,
  document.getElementById("app")
);