import * as React from 'react';
import makeTypeHumanReadable from '../../../functions/makeTypeHumanReadable';
import { Divider, ListItem, ListItemText } from '@material-ui/core';
import { ICreatedCircle } from '../../../../../../customTypeScriptTypes/circle';
import { Link } from 'react-router-dom';

interface Props {
  linkUrl: string;
  primary: string;
  secondary: string;
}

const ListItemC: React.SFC<Props> = ({ linkUrl, primary, secondary }) => {
  return (
    <div>
      <ListItem
        button
        component={(props: any) => <Link {...props} to={linkUrl} />}
      >
        <ListItemText
          inset
          primary={primary || 'Untitled'}
          secondary={secondary}
        />
      </ListItem>
      <Divider />
    </div>
  );
};

export default ListItemC;
