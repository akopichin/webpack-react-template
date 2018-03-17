import * as React from 'react';
import {reduce} from 'lodash';

/**
 * standart export.
 *
 * @prop {React.Component} Component.
export interface IES6ModuleDefaultExport {
    [index: string]: React.ComponentClass<any>
}
 */

/**
 * Component props interface.
 * @prop {Promise} bundle.
 * @prop {boolean} isModal Is the loadable component modal.
 * @prop {any} ...restProps.
 */
interface IAsyncComponentLoaderProps {
    bundle: Promise<any>;
    isModal: boolean;
    [index: string]: any;
}

/**
 * Components state.
 * @prop {boolean} componentLoaded Is component loaded.
 * @prop {boolean} error Is component load failed.
 */
interface IState {
    componentLoaded: boolean;
    error?: boolean;
}

export class AsyncComponentLoader extends React.Component<IAsyncComponentLoaderProps, IState> {

    state: IState = {
        componentLoaded: false,
        error: false
    };

    Component = null;

    componentDidMount(): void {
        const {bundle} = this.props;

        this.getComponent(bundle)
            .then((component) => {
                this.Component = component;
                this.setState({ componentLoaded: true });
            })
            .catch((error) => {
                console.error(`BUNDLE_LOAD_ERROR`, error);
                this.Component = null;
                this.setState({ componentLoaded: false, error: true });
            });
    }

    getComponent = (bundle: Promise<any>) => new Promise((resolve, reject) => {
        bundle
            .then((component) => {
                // In case with export default connect(...)(ReactComponentPage)
                if (component.__esModule === true && !!component.default) {
                    resolve(component.default);
                }
                // In case of name export we agreed for async load component is exports with 'Async' name.
                resolve(component.Async);
            }).catch(error => {
                const notifyEvent = new CustomEvent('notifyEvent', {
                    detail: {
                        message: 'Fail to load component',
                        type: 'error'
                    }
                });
                window.dispatchEvent(notifyEvent);
                reject(error);
            })
    });

    renderComponent = () => {
        const Component = this.Component;

        // Clean up props from ACL's ones bundle & isModal
        const cleanProps = reduce(this.props, (res, val, key) => {
            if (['bundle', 'isModal'].indexOf(key) === -1) {
                res[key] = val;
            }
            return res;
        }, {});

        return (
            <Component {...cleanProps} />
        )
    };

    render() {
        const {error, componentLoaded} = this.state;

        return (
            error ?
                <div className="error">
                    <div>
                        Something went wrong. :(
                    </div>
                </div> :
                componentLoaded ?
                    this.renderComponent() :
                    (<div>Loading</div>)
        );
    }
}

