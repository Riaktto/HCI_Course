import React from 'react';

interface Props {
  children: React.ReactNode;
  /** When this value changes the guard tries again (e.g. the slide number). */
  resetKey?: string | number;
  /** Called after a failure, e.g. to close an overlay. Nothing is ever shown to the audience. */
  onFail?: () => void;
  /** Retry automatically (milliseconds) instead of waiting for resetKey. */
  retryAfter?: number;
}

/**
 * Keeps the room calm: a failing part of the app renders nothing (never an error message) and the
 * rest keeps working. Details only go to the browser console.
 */
export class ErrorGuard extends React.Component<Props, { failed: boolean }> {
  state = { failed: false };
  private timer: number | undefined;

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.warn('[guard]', error);
    this.props.onFail?.();
    if (this.props.retryAfter) {
      window.clearTimeout(this.timer);
      this.timer = window.setTimeout(() => this.setState({ failed: false }), this.props.retryAfter);
    }
  }

  componentDidUpdate(prev: Props) {
    if (this.state.failed && prev.resetKey !== this.props.resetKey) this.setState({ failed: false });
  }

  componentWillUnmount() {
    window.clearTimeout(this.timer);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
