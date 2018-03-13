import * as React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';

import {IAction, IAsyncData} from 'Core/Models';
import {EProcessStatus} from 'Core/Enums';
import {SampleActions, ISampleActions} from '../Actions/actions';
import {SampleApi} from '../Services/service';
import {ISampleStoreBranch} from '../Models/ISampleStoreBranch';
import {Example} from 'Modules/Example/Components/Example';

interface IStateProps {
    text: IAsyncData<string>;
}

interface IDispatchProps {
    actions: ISampleActions
}

interface IState {
    error: boolean;
}

class HelloComponent extends React.Component<IStateProps & IDispatchProps, IState> {

    state: IState = {error: false};

    render() {
        const {actions} = this.props;
        const {text} = this.props;
        let message = '';
        let exampleVisible = false;

        switch (text.status) {
            case EProcessStatus.SUCCESS:
                message = text.data;
                exampleVisible = true;
                break;
            case EProcessStatus.RUNNING:
                message = 'Running';
                break;
            case EProcessStatus.IDLE:
                message = '...';
                break;
        }

        if (this.state.error) {
            throw new Error("Error");
        }

        return (
            <div onClick={() => { this.setState({error: true}); actions.loadListAsync(); }}>
                {message}
                <div>
                    {!!exampleVisible && <Example />}
                </div>
            </div>
        )
    }
}

function mapStateToProps (state: ISampleStoreBranch) {
    return {text: state.sample.text};
}

function mapDispatchToProps (dispatch: Dispatch<IAction>): {actions: ISampleActions} {
    const actions = new SampleActions(SampleApi, dispatch);

    return {actions};
}

export const Hello = connect<IStateProps, IDispatchProps, {}>(mapStateToProps, mapDispatchToProps)(HelloComponent);
