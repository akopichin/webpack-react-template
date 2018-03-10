import * as React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {withReducers} from 'Core/Utils/HOC/withReducers';
import {IAction} from 'Core/Models';
import {ExampleActions, IExampleActions} from '../Actions/actions';
import {mappedExampleReducers} from '../Reducers/reducers';
import {IExampleStoreBranch} from '../Models/IExampleStoreBranch';

interface IStateProps {
    hello: string;
}

interface IDispatchProps {
    actions: IExampleActions
}

class ExampleComponent extends React.Component<IStateProps & IDispatchProps, {}> {

    handleClick = (e) => {
        const {actions} = this.props;
        e.stopPropagation();
        actions.sayHello()
    }

    render() {
        const {hello} = this.props;

        return (
            <div onClick={this.handleClick}>
                -= {hello} =-
            </div>
        )
    }
}

function mapStateToProps (state: IExampleStoreBranch) {
    return {hello: state.example.hello};
}

function mapDispatchToProps (dispatch: Dispatch<IAction>): {actions: IExampleActions} {
    const actions = new ExampleActions(dispatch);

    return {actions};
}

const ExampleConnected = connect<IStateProps, IDispatchProps, {}>(mapStateToProps, mapDispatchToProps)(ExampleComponent);

export const Example = withReducers<{}>(ExampleConnected, mappedExampleReducers)
