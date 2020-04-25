import React, { ErrorInfo } from 'react';
import { logError } from '../services/logger';

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<{}, State> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logError(error, errorInfo);
  }

  render() {
    return this.state.hasError ? (
      <div className="ErrorBoundary">
        <h3>Sorry, there was a problem loading this page</h3>
      </div>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
