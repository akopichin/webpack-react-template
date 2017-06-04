import * as React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';

import {IAction, IAsyncData} from 'app/Core/Models';
import {EProcessStatus} from 'app/Core/Enums';

import {SampleActions, ISampleActions} from '../Actions/actions';
import {SampleApi} from '../Services/service';
import {ISampleStoreBranch} from '../Models/ISampleStoreBranch';

interface IProps {
    actions: ISampleActions
    text: IAsyncData<string>;
}

class HelloComponent extends React.Component<IProps, void> {
    render() {
        const {text} = this.props;
        let message = '';

        switch (text.status) {
            case EProcessStatus.SUCCESS:
                message = text.data;
                break;
            case EProcessStatus.RUNNING:
                message = 'Running';
                break;
            case EProcessStatus.IDLE:
                message = '...';
                break;
        }

        return (
            <div onClick={() => { this.props.actions.loadListAsync(); }}>
                {message}
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

export const Hello = connect<{text: IAsyncData<string>}, {actions: ISampleActions}, {}>(mapStateToProps, mapDispatchToProps)(HelloComponent);
