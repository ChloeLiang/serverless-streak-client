import ReactGA, { EventArgs } from 'react-ga';

const initAnalytics = () => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID || '');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
};

const tagEvent = (interaction: EventArgs) => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.event(interaction);
  }
};

export { initAnalytics, tagEvent };
