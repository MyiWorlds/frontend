import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import NoMoreResults from '../NoMoreResults';
import SearchCategory from '../SearchCategory';
import { GridProps } from '@material-ui/core/Grid';
import { IProfile } from '../../../../../../../types/profile.d';
import { SearchCircle } from '../../searchTypes';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles } from '@material-ui/styles';

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
