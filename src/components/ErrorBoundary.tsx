import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
                    <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-6 border border-red-100">
                        <h1 className="text-xl font-bold text-red-600 mb-4">Something went wrong</h1>
                        <div className="bg-red-50 p-4 rounded text-sm font-mono text-red-800 overflow-auto mb-4">
                            {this.state.error && this.state.error.toString()}
                        </div>
                        <details className="text-xs text-gray-500">
                            <summary className="cursor-pointer mb-2">Stack Trace</summary>
                            <pre className="whitespace-pre-wrap">
                                {this.state.errorInfo && this.state.errorInfo.componentStack}
                            </pre>
                        </details>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-6 w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
