/*
import * as React from 'react';
import {Store} from 'redux';
import {connect} from 'react-redux';

import {getRootReducer, isReplaceNeeded} from 'app/Core/rootReducer';
*/

/**
 * Redux store from context.
 *
 * @prop {Store} store Redux store.
interface IContext {
    store: Store<Object>;
}
 */

/**
 * HOC for dynamically add reducers.
 */
/*
export function withReducers<TProps>(Component, reducers) {
    class WithReducersComponent extends React.Component<TProps, void> {
        static contextTypes = {
            store: React.PropTypes.object.isRequired
        };

        constructor(props, context: IContext) {
            super(props, context);
            if (isReplaceNeeded(reducers)) {
                context.store.replaceReducer(getRootReducer(reducers || {}));
            }
        }

        render() {
            return (
                <Component {...this.props} />
            );
        }
    }

    const WithReducers = connect(null, null)(WithReducersComponent);

    return WithReducers;
}
*/
