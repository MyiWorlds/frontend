import * as React from 'react';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">home</Link>
        <br />
        <Link to="/id/circle1">Page2</Link>
      </div>
    );
  }
}

export default Navigation;
