import * as React from 'react';
import { Link } from 'react-router-dom';
// This is only used because of an issue between material-ui and react-router
// https://github.com/facebook/create-react-app/issues/5820

const ForwardButton = React.forwardRef(
  (props: any, ref: React.Ref<HTMLAnchorElement>) => (
    <Link {...props} innerRef={ref} />
  ),
);

export default ForwardButton;
