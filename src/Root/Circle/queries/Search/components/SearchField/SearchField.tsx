import * as React from 'react';
import Progress from '../../../../../components/Progress';
import ProgressWithMessage from '../../../../../components/ProgressWithMessage';
import {
  Icon,
  InputAdornment,
  TextField,
  withStyles
  } from '@material-ui/core';

interface Props {
  handleSearchFieldChange: (event: any) => void;
  isSearching: boolean;
  search: () => void;
  searchFieldString: string;
  classes: {
    container: string;
    textFieldProgress: string;
    searchIcon: string;
  };
}

const styles = {
  container: {
    padding: '0px 8px 8px 8px',
    margin: '8px 8px 0px 8px',
  },
  textFieldProgress: {
    position: 'relative' as 'relative',
    width: 14,
    height: 14,
    margin: '4px 0px 6px 0px',
    paddingRight: 10,
  },
  searchIcon: {
    margin: 8,
  },
};

const SearchField: React.SFC<Props> = ({
  classes,
  handleSearchFieldChange,
  search,
  isSearching,
  searchFieldString,
}) => {
  const progress = (
    <div className={classes.textFieldProgress}>
      <Progress hideBackground={true} size={24} />
    </div>
  );

  const searchIcon = <Icon>search</Icon>;

  let textfieldIcon = null;

  if (isSearching) {
    textfieldIcon = progress;
  } else {
    textfieldIcon = searchIcon;
  }

  return (
    <div className={classes.container}>
      <TextField
        id="tags"
        autoFocus={true}
        autoComplete="off"
        label="Search"
        value={searchFieldString}
        onChange={event => handleSearchFieldChange(event)}
        margin="normal"
        fullWidth
        onKeyPress={event => {
          if (event.key === 'Enter') {
            event.preventDefault();
            search();
          }
        }}
        InputLabelProps={{
          style: {
            lineHeight: '-.25rem',
          },
        }}
        InputProps={{
          style: {
            lineHeight: '1.5rem',
          },
          startAdornment: (
            <InputAdornment
              position="start"
              classes={{ root: classes.searchIcon }}
            >
              {textfieldIcon}
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default withStyles(styles)(SearchField);
