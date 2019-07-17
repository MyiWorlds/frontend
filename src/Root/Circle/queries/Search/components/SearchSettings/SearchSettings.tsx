import * as React from 'react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import FormGroup from '@material-ui/core/FormGroup';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles } from '@material-ui/styles';

interface Props {
  allResults: boolean;
  handleChange: (value: any) => void;
  myCreations: boolean;
  myEditable: boolean;
  myViewable: boolean;
  resultsDense: boolean;
  resultsShowSecondary: boolean;
  updateGridSize: () => void;
  updateSearchCategories: (value: any) => void;
  classes: {
    cardContainers: string;
    btnIcon: string;
    primarySearchActions: string;
    primarySearchActionsItem: string;
    checkButton: string;
  };
}

const styles = (theme: Theme) => ({
  cardContainers: {
    padding: '0 8px',
    width: '100%',
  },
  btnIcon: {
    marginRight: 4,
  },
  primarySearchActions: {
    padding: 8,
  },
  primarySearchActionsItem: {
    marginRight: 8,
  },
  checkButton: {
    padding: '0 16px 0px 0px',
    marginRight: 8,
  },
});

const SearchSettings: React.SFC<Props> = ({
  allResults,
  classes,
  handleChange,
  resultsDense,
  resultsShowSecondary,
  myCreations,
  myEditable,
  myViewable,
  updateGridSize,
  updateSearchCategories,
}) => {
  return (
    <div>
      <Divider />
      <div className={classes.primarySearchActions}>
        <Button variant="outlined" className={classes.primarySearchActionsItem}>
          <Icon className={classes.btnIcon}>view_list</Icon>
          List Item Style
        </Button>
        <Button
          variant="outlined"
          onClick={() => updateGridSize()}
          className={classes.primarySearchActionsItem}
        >
          <Icon className={classes.btnIcon}>dashboard</Icon>
          Category Layout
        </Button>
      </div>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
          <Typography>More Search Settings</Typography>
        </ExpansionPanelSummary>
        <Divider />
        <ExpansionPanelDetails>
          <div className={classes.cardContainers}>
            <br />
            <Typography variant="subtitle2">Results Display Options</Typography>
            <br />
            <FormGroup row>
              <Button
                variant="outlined"
                className={classes.checkButton}
                onClick={() =>
                  handleChange({
                    resultsShowSecondary: !resultsShowSecondary,
                  })
                }
              >
                <Checkbox
                  checked={resultsShowSecondary}
                  value="dense"
                  color="primary"
                />
                Secondary Text
              </Button>

              <Button
                variant="outlined"
                className={classes.checkButton}
                onClick={() =>
                  handleChange({
                    resultsDense: !resultsDense,
                  })
                }
              >
                <Checkbox
                  checked={resultsDense}
                  value="dense"
                  color="primary"
                />
                Dense
              </Button>
            </FormGroup>
            <br />
            <Typography variant="subtitle1">Categories Displayed</Typography>
            <br />
            <FormGroup row>
              <Button
                variant="outlined"
                className={classes.checkButton}
                onClick={() =>
                  updateSearchCategories({ myCreations: !myCreations })
                }
              >
                <Checkbox color="primary" checked={myCreations} value="dense" />
                My Creations
              </Button>

              {/* THESE QUERIES ARE CURRENTLY NOT POSSIBLE WITH FIRESTORE */}
              {/* <Button
                variant="outlined"
                className={classes.checkButton}
                onClick={() =>
                  updateSearchCategories({ myEditable: !myEditable })
                }
              >
                <Checkbox color="primary" checked={myEditable} value="dense" />
                My Editable
              </Button>

              <Button
                variant="outlined"
                className={classes.checkButton}
                onClick={() =>
                  updateSearchCategories({ myViewable: !myViewable })
                }
              >
                <Checkbox color="primary" checked={myViewable} value="dense" />
                My Viewable
              </Button> */}

              <Button
                variant="outlined"
                className={classes.checkButton}
                onClick={() =>
                  updateSearchCategories({ allResults: !allResults })
                }
              >
                <Checkbox color="primary" checked={allResults} value="dense" />
                All Results
              </Button>
            </FormGroup>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default withStyles(styles)(SearchSettings);
