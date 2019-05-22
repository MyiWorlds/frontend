import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { ICreatedCircle } from '../../../../../../../customTypeScriptTypes/circle';
import { Link } from 'react-router-dom';

interface Props {
  lines: ICreatedCircle[];
  resultsDense: boolean;
  resultsShowSecondary: boolean;
}

const SearchResults: React.SFC<Props> = ({
  lines,
  resultsDense,
  resultsShowSecondary,
}) => {
  return (
    <List dense={resultsDense}>
      {lines.map(circle => (
        <ListItem
          button
          key={circle.id}
          component={(props: any) => (
            <Link {...props} to={`/id/${circle.id}`} />
          )}
        >
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={circle.title}
            secondary={
              resultsShowSecondary
                ? circle.tags
                  ? circle.tags.map((tag, index) => (
                      <span key={index}> {tag}</span>
                    ))
                  : null
                : null
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default SearchResults;
