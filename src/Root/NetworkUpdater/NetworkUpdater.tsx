import * as React from 'react';
import client from '../..//apolloClient';
import gql from 'graphql-tag';

interface Props {
  isConnected: boolean;
}

const UPDATE_NETWORK_STATUS = gql`
  mutation updateNetworkStatus($isConnected: Boolean) {
    updateNetworkStatus(isConnected: $isConnected) @client
  }
`;

class NetworkUpdater extends React.Component<Props> {
  componentDidUpdate(prevProps: Props) {
    if (prevProps.isConnected !== this.props.isConnected) {
      console.log('You are now in offline mode');

      client.mutate({
        mutation: UPDATE_NETWORK_STATUS,
        variables: {
          isConnected: this.props.isConnected,
        },
      });
    }
  }

  render() {
    return <>{this.props.children}</>;
  }
}

export default NetworkUpdater;
