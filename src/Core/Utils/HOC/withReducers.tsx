import * as React from 'react';
import {Store} from 'redux';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {getRootReducer, isReplaceNeeded} from 'Core/rootReducer';

/**
 * Redux store from context.
 *
 * @prop {Store} store Redux store.
 */
interface IContext {
    store: Store<Object>;
}

/**
 * HOC for dynamically add reducers.
 */
const withReducers = function<TProps>(Component, reducers): React.ComponentClass<TProps> {
    class WithReducersComponent extends React.Component<TProps, {}> {

        static displayName = `WithReducers(${Component.displayName || Component.name || 'Component'})`;

        static contextTypes = {
            store: PropTypes.object.isRequired
        };

        constructor(props: TProps, context: IContext) {
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

    return connect<{}, {}, TProps>(null, null)(WithReducersComponent);
};

export {
    withReducers
}

