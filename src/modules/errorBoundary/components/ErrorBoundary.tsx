import * as React from "react";
 
export interface ErrorBoundaryState {
    hasError: boolean;
}
 
export interface ErrorBoundaryProps {
    className?: string;
}
 
export class ErrorBoundary extends React.PureComponent<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }
    public componentDidCatch() {
        this.setState({ hasError: true });
    }
 
    public render() {
        return (
            <>
                {
                    this.state.hasError ? <div className={this.props.className}>An Error Has Occurred</div>
                                        : this.props.children
                }
            </>
        )
    }
}
