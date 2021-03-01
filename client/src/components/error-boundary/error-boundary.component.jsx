import React from "react";

import {
  ErrorImageContainer,
  ErrorImageOverlay,
  ErrorImageText,
} from "./error-boundary.styles";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasErrored: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasErrored: true,
      error: error,
    };
  }

  componentDidCatch(error, info) {
    console.error(error);
  }

  render() {
    const { hasErrored } = this.state;
    const { children } = this.props;

    return hasErrored ? (
      <ErrorImageOverlay>
        <ErrorImageContainer imageUrl="https://i.imgur.com/A040Lxr.png" />
        <ErrorImageText>Sorry this page is broken</ErrorImageText>
      </ErrorImageOverlay>
    ) : (
      children
    );
  }
}

export default ErrorBoundary;
