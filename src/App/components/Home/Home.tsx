import * as React from 'react';

interface User {
  email: string;
}

interface Props {
  user: User;
}

class Home extends React.Component<Props> {
  render() {
    const { user } = this.props as Props;
    return (
      <div>
        <h1>welcome {user.email}</h1>
      </div>
    );
  }
}

export default Home;
