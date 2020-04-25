import ReactGA, { EventArgs } from 'react-ga';

const initAnalytics = () => {
  ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID || '');
};

const tagEvent = (interaction: EventArgs) => {
  ReactGA.event(interaction);
};

export { initAnalytics, tagEvent };
