import * as React from 'react';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ForwardButtonLink } from '../../../../components/ForwardButtonLink';

interface Props {
  linkUrl: string;
  primary: string;
  secondary: string;
}

const ListItemC: React.SFC<Props> = ({ linkUrl, primary, secondary }) => {
  return (
    <div>
      <ListItem button component={ForwardButtonLink} to={linkUrl}>
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
