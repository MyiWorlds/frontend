import networkStatus from './networkStatus';
import selectedProfile from './selectedProfile';
import { merge } from 'lodash';

const apolloLinkState = {
  ...merge(networkStatus, selectedProfile),
};

export default apolloLinkState;
