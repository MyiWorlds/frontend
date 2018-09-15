import * as React from 'react';
import fire from '../../../firebase';

interface Props {
  refetch: () => void;
}

interface Error {
  code: string;
  message: string;
}

const Logout: React.SFC<Props> = ({ refetch }) => {
  const logout = async refetch => {
    await fire
      .auth()
      .signOut()
      .then(() => {
        console.log('You were signed out');
        localStorage.removeItem('token');
      })
      .catch((error: Error) =>
        console.log('Error happend logging out', error.code, error.message),
      );

    refetch();
  };

  return <button onClick={() => logout(refetch)}>Logout</button>;
};

export default Logout;
