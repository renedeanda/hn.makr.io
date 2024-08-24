
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1 className="text-red-500 text-center mt-10">Something went wrong. Please try refreshing the page.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
