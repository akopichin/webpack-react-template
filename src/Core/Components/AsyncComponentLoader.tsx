import {reduce} from 'lodash';
import * as React from 'react';

/**
 * Component props interface.
 * @prop {Promise} bundle.
 * @prop {boolean} isModal Is the loadable component modal.
 * @prop {Function} componentResolver ComponentResolver.
 * @prop {any} ...restProps.
 */
interface IAsyncComponentLoaderProps {
    bundle: Promise<any>;
    isModal: boolean;
    componentResolver: (module: any) => React.Component | React.SFC | React.PureComponent;
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
        const {bundle, componentResolver} = this.props;

        this.getModule(bundle)
            .then((component) => {
                this.Component = componentResolver(component);
                this.setState({ componentLoaded: true });
            })
            .catch((error) => {
                console.error(`BUNDLE_LOAD_ERROR`, error);
                this.Component = null;
                this.setState({ componentLoaded: false, error: true });
            });
    }

    getModule = (bundle: Promise<any>) => new Promise((resolve) => {
        bundle
            .then((component) => {
                resolve(component);
            });
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

