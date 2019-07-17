import * as React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { withStyles } from '@material-ui/styles';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';

const jsonlint = require('jsonlint-mod');

const codemirror = require('codemirror');
(window as any).jsonlint = jsonlint;
require('codemirror/mode/javascript/javascript');
// require('codemirror/mode/application/json');

const orig = codemirror.hint.javascript;

codemirror.hint.javascript = function(codemirror: any) {
  var inner = orig(codemirror) || {
    from: codemirror.getCursor(),
    to: codemirror.getCursor(),
    list: [],
  };
  inner.list.push('bozo');
  return inner;
};

interface Props {
  label?: string;
  property: string;
  value: any;
  updateCircle: (newValue: any, noDelay?: boolean) => void;
  classes: {
    editor: string;
  };
}

interface State {
  initialValue: any;
  error: boolean;
  message: string | null;
}

interface CodeEditor {
  saveTimeout: any;
}

const styles = () => ({
  editor: {
    // position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
});

class CodeEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let initialValue = props.value;
    try {
      JSON.parse(props.value);
      initialValue = props.value;
    } catch (error) {
      initialValue = JSON.stringify(props.value, null, 2);
    }

    this.state = {
      initialValue,
      error: false,
      message: null,
    };
  }

  componentWillUnmount() {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
  }

  onChange = (newValue: any) => {
    const { updateCircle, value } = this.props;
    try {
      newValue = JSON.parse(newValue);
      if (this.saveTimeout) {
        clearTimeout(this.saveTimeout);
      }
      if (this.state.error) {
        this.setState({ error: false, message: null });
      }
      if (newValue !== value) {
        this.saveTimeout = setTimeout(() => {
          updateCircle(newValue, true);
          console.log('saved');
        }, 2000);
      }
    } catch (error) {
      newValue = newValue;
      this.setState({ error: true, message: 'Invalid JSON' });
    }
  };

  render() {
    const { classes } = this.props;
    const { initialValue, error, message } = this.state;

    return (
      <div
        style={{
          flex: '1 1 auto',
          marginTop: 0,
          height: '100%',
          position: 'relative',
        }}
      >
        <div>{error ? <h4>{message}</h4> : null}</div>
        <CodeMirror
          className={classes.editor}
          value={initialValue}
          options={{
            mode: 'application/json',
            styleActiveLine: true,
            lint: true,
            autocorrect: true,
            gutters: ['CodeMirror-lint-markers'],
            theme: 'monokai',
            extraKeys: { 'Ctrl-Space': 'autocomplete' },
            lineNumbers: true,
            tabSize: 2,
          }}
          onChange={(editor, data, value) => {
            // console.log('editor', editor, 'data', data, 'value', value);
            this.onChange(value);
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(CodeEditor);
