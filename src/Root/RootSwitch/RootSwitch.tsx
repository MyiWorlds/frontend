import * as React from 'react';
import Circle1 from '../Circle';
import Profile1 from '../Profile';

interface Props {
  selectedProfile: ISelectedProfile;
  document: ICircle;
}

const RootSwitch: React.SFC<Props> = ({ selectedProfile, document }) => {
  switch (document.type) {
    case 'profiles':
      return <Profile1 selectedProfile={selectedProfile} circle={document} />;
    case 'circles':
      return <Circle1 selectedProfile={selectedProfile} circle={document} />;
    default:
      return null;
  }
};

export default RootSwitch;
