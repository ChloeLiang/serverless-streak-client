import * as Sentry from '@sentry/browser';
import config from '../config';

const isLocal = process.env.NODE_ENV === 'development';

const initSentry = () => {
  if (isLocal) {
    return;
  }
  Sentry.init({ dsn: config.sentry.DSN });
};

const logError = (
  error: Error,
  errorInfo: Error | { url: string } | undefined
) => {
  if (isLocal) {
    return;
  }
  Sentry.withScope((scope) => {
    errorInfo && scope.setExtra('errorInfo', errorInfo);
    Sentry.captureException(error);
  });
};

const onError = (error: any) => {
  let errorInfo;
  let message = error.toString();

  // Auth errors
  if (!(error instanceof Error) && error.message) {
    errorInfo = error;
    message = error.message;
    error = new Error(message);
    // API errors
  } else if (error.config && error.config.url) {
    errorInfo = { url: error.config.url };
  }

  logError(error, errorInfo);
};

export { initSentry, onError };
