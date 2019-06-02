import * as React from 'react';
import NoMoreResults from '../NoMoreResults';
import SearchCategory from '../SearchCategory';
import { Grid, Theme } from '@material-ui/core';
import { GridProps } from '@material-ui/core/Grid';
import { IProfile } from './../../../../../../../customTypeScriptTypes/profile.d';
import { SearchCircle } from '../../searchTypes';
import { withStyles } from '@material-ui/core';

interface Props {
  gridSize: GridProps;
  isSearching: boolean;
  showMoreResults: (circle: SearchCircle) => void;
  circle: SearchCircle | null;
  resultsDense?: boolean;
  resultsShowSecondary?: boolean;
  searchFieldString: string;
  profile: IProfile;
  classes: {
    container: string;
    avatar: string;
  };
}

const styles = (theme: Theme) => ({
  container: {
    padding: 8,
  },
  avatar: {
    background: 'none',
  },
});

const SearchCategoryResultList: React.SFC<Props> = ({
  circle,
  classes,
  gridSize,
  isSearching,
  resultsDense = false,
  resultsShowSecondary = false,
  searchFieldString,
  showMoreResults,
  profile,
}) => {
  if (circle && circle.lines && circle.lines.length) {
    return (
      <div className={classes.container}>
        <Grid container spacing={8}>
          {circle.lines.map((circle, index) => {
            return (
              <SearchCategory
                key={circle.id}
                index={index}
                circle={circle}
                gridSize={gridSize}
                resultsDense={resultsDense}
                resultsShowSecondary={resultsShowSecondary}
                showMoreResults={showMoreResults}
              />
            );
          })}
        </Grid>
      </div>
    );
  } else if (searchFieldString === '' || isSearching) {
    return null;
  } else {
    return <NoMoreResults profile={profile} />;
  }
};

export default withStyles(styles)(SearchCategoryResultList);
