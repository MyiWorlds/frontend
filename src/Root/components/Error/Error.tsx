import * as React from 'react';

interface Props {
  error: Error;
}

const Error: React.SFC<Props> = ({ error, children }) => {
  //Send error to servers
  // Not connected? Add to cache of things to write to db
  // If Changed from offline -> online check if there is anything that need to be created
  // Create that array of items on connected to create
  // Maybe add for ones you are trying to search?
  // Adds item to history

  // History.  If you share these around they have no user account tied to them, or profiles
  // [
  // Create - Circle (have access to circles id after its created for you to jump back to)
  // Get - Circle
  // Get - ProfilesById
  // Get - ProfilesByFilters
  // Get - cirlcleById
  // ]

  // console.error(error);
  // Display content however you pass in
  return <div>{children}</div>;
};

export default Error;
