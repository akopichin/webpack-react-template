import * as React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';

import {IAction} from 'app/Core/Models';

import {AppActionsClass, IAppActions} from '../Actions/actions';
import {AppApi} from '../Services/service';
import {IStore} from '../Models/IStore';

interface IMappedProps {
    text: string;
}

interface IProps extends IMappedProps {
    actions: IAppActions
}

class HelloComponent extends React.Component<IProps, void> {
    render() {
        const {text} = this.props;
        const name = text || '';

        return (
            <div onClick={() => { this.props.actions.loadListAsync(); }}>
                Hello {name}!
            </div>
        )

    }
}

function mapDispatchToProps (dispatch: Dispatch<IAction>): {actions: IAppActions} {
    const actions = new AppActionsClass(AppApi, dispatch);

    return {actions};
}

function mapStateToProps (state: IStore): IMappedProps {
    return {text: state.sample.text};
}

export const Hello = connect<IMappedProps, any, {}>(mapStateToProps, mapDispatchToProps)(HelloComponent);
