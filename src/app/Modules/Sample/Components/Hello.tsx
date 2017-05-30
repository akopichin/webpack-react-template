import * as React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';

import {IAction} from 'app/Core/Models';

import {AppActionsClass, IAppActions} from '../Actions/actions';
import {AppApi} from '../Services/service';
import {IStore} from '../Models/IStore';

interface IProps {
    actions: IAppActions
    text: string;
}

class HelloComponent extends React.Component<IProps, void> {
    render() {
        const {text} = this.props;
        const name = text || 'guest';

        return (
            <div onClick={() => { this.props.actions.loadListAsync(); }}>
                Hello {name}!
            </div>
        )

    }
}

function mapStateToProps (state: IStore) {
    return {text: state.sample.text};
}

function mapDispatchToProps (dispatch: Dispatch<IAction>): {actions: IAppActions} {
    const actions = new AppActionsClass(AppApi, dispatch);

    return {actions};
}

export const Hello = connect<{text: string}, {actions: IAppActions}, {}>(mapStateToProps, mapDispatchToProps)(HelloComponent);
