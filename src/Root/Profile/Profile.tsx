import * as React from 'react';
import { ICreatedCircle } from '../../../customTypeScriptTypes/circle';
import { IProfile } from '../../../customTypeScriptTypes/profile';

interface Props {
  selectedProfile: IProfile;
  circle: ICreatedCircle;
}

// NOT IMPLEMENTED YET
const Profile: React.SFC<Props> = ({ selectedProfile, circle }) => {
  const type = circle.type.includes('-')
    ? circle.type.substring(0, circle.type.indexOf('-'))
    : circle.type;
  console.log(selectedProfile);
  switch (type) {
    case 'GET_PROFILE_BY_USERNAME':
      return <div>Profile component</div>;
    default:
      return null;
  }
};

export default Profile;
