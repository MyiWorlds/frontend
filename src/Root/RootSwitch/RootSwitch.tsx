import * as React from 'react';
import CircleViewerSwitch from '../Circle/CircleViewerSwitch';
import Profile from '../Profile';
import { ICreatedCircle } from '../../../customTypeScriptTypes/circle';
import { IProfile } from '../../../customTypeScriptTypes/profile';

interface Props {
  document: ICreatedCircle;
  selectedProfile: IProfile;
}

const RootSwitch: React.SFC<Props> = ({ document, selectedProfile }) => {
  switch (document.type) {
    case 'profiles':
      return <Profile selectedProfile={selectedProfile} circle={document} />;
    case 'circles':
      return (
        <CircleViewerSwitch
          selectedProfile={selectedProfile}
          circle={document}
        />
      );
    default:
      return null;
  }
};

export default RootSwitch;
