import * as React from 'react';
import Typography from '@material-ui/core/Typography';

interface Props {
  property?: string;
  value: string;
}

const CodeViewer: React.SFC<Props> = ({ property, value }) => {
  return (
    <div>
      {property && <Typography variant="caption">{property}</Typography>}
      <Typography variant="body1">{value}</Typography>
    </div>
  );
};

export default CodeViewer;
