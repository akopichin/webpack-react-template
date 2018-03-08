import * as React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';

import {IAction, IAsyncData} from 'app/Core/Models';
import {EProcessStatus} from 'app/Core/Enums';
import {SampleActions, ISampleActions} from '../Actions/actions';
import {SampleApi} from '../Services/service';
import {ISampleStoreBranch} from '../Models/ISampleStoreBranch';
import {Example} from 'app/Modules/Example/Components/Example';

interface IStateProps {
    text: IAsyncData<string>;
}

interface IDispatchProps {
    actions: ISampleActions
}

class HelloComponent extends React.Component<IStateProps & IDispatchProps, {}> {
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
                message = '.|.';
                break;
        }

        return (
            <div onClick={() => { actions.loadListAsync(); }}>
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
