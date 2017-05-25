import * as React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {AppActions, IAppActions} from '../Actions/actions';

interface IProps {
    actions: IAppActions
}

class HelloComponent extends React.Component<IProps, void> {
    render() {
        return (
            <div onClick={() => { this.props.actions.loadListAsync(); }}>Hello</div>
        )
    }
}

function mapDispatchToProps (dispatch) {
    const actions = bindActionCreators(AppActions as any, dispatch);

    return {actions};
}

export const Hello = connect(null, mapDispatchToProps)(HelloComponent);
