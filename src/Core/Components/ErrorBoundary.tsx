import * as React from 'react';

/**
 * Error component state
 */
interface IState {
    error: string;
    errorInfo: {
        componentStack: string;
    };
}

/**
 * Common HOC to catch errors from children components.
 */
export class ErrorBoundary extends React.Component<{}, IState> {

    constructor (props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null
        }
    }

    componentDidCatch (error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    render () {
        const {error, errorInfo} = this.state;

        return error
            ? (
                // @todo Setup error layout.
                <div className="error-boundary error">
                    <ul className="error">
                        {
                            errorInfo && errorInfo.componentStack.split('\n')
                                // filter empty lines.
                                .filter(errorText => !!errorText.trim())
                                // create list items.
                                .map((error: string, index: number) => (
                                    <li className="error-item" key={index}>{error}</li>
                            ))
                        }
                    </ul>
                </div>
            )
            : this.props.children;
    }
}
