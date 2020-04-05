import { RouteComponentProps } from 'react-router-dom';
import { createMemoryHistory, createLocation } from 'history';

const routerProps: RouteComponentProps = {
  history: createMemoryHistory(),
  location: createLocation('/'),
  match: {
    isExact: false,
    path: '/',
    url: '/',
    params: {},
  },
};

export default routerProps;
