import {EXAMPLE_ACTION} from './actionTypes';

export interface IExampleActions {
    sayHello: Function;
}

class ExampleActions implements IExampleActions {
    constructor(private dispatch) {}

    /**
     * Load items to show
     */
    sayHello = () => {
        return (dispatch => {
            return dispatch({
                type: EXAMPLE_ACTION,
                payload: 'Hello'
            });
        })(this.dispatch)
    }
}

export {
    ExampleActions
}
