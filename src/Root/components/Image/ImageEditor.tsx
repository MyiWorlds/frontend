import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import gql from 'graphql-tag';
import Icon from '@material-ui/core/Icon';
import React, { useCallback, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IEditingCircle } from '../../../../types/circle';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/react-hooks';

interface Props {
  updateCircle: (circle: IEditingCircle, noDelay?: boolean) => void;
}

interface State {
  src: string;
}

const fileUploadMutation = gql`
  mutation fileUpload($file: Upload!) {
    fileUpload(file: $file) {
      url
      sizes
    }
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
    },
    inputContainer: {
      position: 'absolute',
      padding: theme.spacing(3),
      textAlign: 'center',
      minWidth: 200,
      width: '50%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      opacity: 0.6,
      zIndex: 999,
      '&:hover': {
        opacity: 1,
      },
    },
    dropArea: {
      cursor: 'pointer',
      border: `${theme.spacing(1) / 2}px dashed ${theme.palette.divider}`,
      borderRadius: theme.spacing(1),
      padding: theme.spacing(2),
    },
    btnIcon: {
      marginRight: theme.spacing(1),
    },
    uploadIcon: {
      fontSize: 30,
    },
    imgContainer: {
      height: '100%',
      width: '100%',
      textAlign: 'center',
    },
    img: {
      maxHeight: '100%',
      maxWidth: '100%',
    },
  }),
);
export default function ImageEditor(props: Props) {
  const classes = useStyles();

  const [fileUpload, { data, loading, error }] = useMutation(
    fileUploadMutation,
  );

  const onDrop = useCallback(
    ([file]) => {
      fileUpload({ variables: { file } });
    },
    [fileUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
  });

  let src = '';
  let sizes = undefined;

  if (error) {
    console.log(error);
  }

  if (data) {
    src = data.fileUpload.url;
    sizes = data.fileUpload.sizes;
  }

  console.log(sizes);
  return (
    <div className={classes.container}>
      <Card elevation={3} className={classes.inputContainer}>
        <form noValidate autoComplete="off">
          <div {...getRootProps()} className={classes.dropArea}>
            <Typography gutterBottom variant="h5" component="h2">
              Upload Image
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Drag and drop files here
            </Typography>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <div>
                <br />
                <Icon className={classes.uploadIcon}>image</Icon>
                <br />
                <br />
                <Button color="primary" variant="contained">
                  <Icon className={classes.btnIcon}>cloud_upload</Icon>
                  Upload
                </Button>
              </div>
            )}
          </div>
        </form>
      </Card>
      {src !== '' && (
        <div className={classes.imgContainer}>
          <img
            src={src}
            className={classes.img}
            // sizes={sizes}
            // sizes={'64px, 124px, 256px, 480px, 720px, 1280px, 3840px'}
          />
        </div>
      )}
    </div>
  );
}
