import * as React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
// import { Button, Card, TextField } from '@material-ui/core';
// import { Redirect } from 'react-router-dom';

const CREATE_CIRCLE = gql`
  mutation createCircle(
    $id: String
    $collection: String!
    $title: String
    $type: String!
    $creator: String!
    $data: JSON
  ) {
    createCircle(
      id: $id
      collection: $collection
      title: $title
      type: $type
      creator: $creator
      data: $data
    ) {
      status
      message
      # Not working
      creator {
        id
      }
      createdCircle {
        id
        type
        title
      }
    }
  }
`;

// interface Circle {
//   uid: string,
//   pii: boolean,
//   creator: string,
//   dateCreated: number,
//   dateUpdated: number,
//   parent: string?,
//   slug: string,
//   public: boolean,
//   type: string,
//   settings: string,
//   styles: Array<string>,
//   rating: string,
//   tags: Array<string>,
//   title: string,
//   subtitle: string,
//   description: string,
//   media: string,
//   icon: string,
//   users: Array<string>,
//   editors: Array<string>,
//   string: string,
//   data: object,
//   number: number,
//   bigNumber: number,
//   boolean: boolean,
//   date: string,
//   geoPoint: object?,
//   lines: Array<string>,
// }

interface State {
  toCircle: boolean;
  id: string;
  title: string;
  type: string;
  creator: string;
  data: any;
  dateCreated: number;
}

interface Prop {
  selectedProfile: {
    id: string | null;
  };
}

class CreateCircle extends React.Component<Prop, State> {
  constructor(props: Prop) {
    super(props);
    this.state = {
      toCircle: false,
      id: 'appstyle',
      title: 'testing',
      type: 'STYLE',
      data: {
        palette: {
          primary: {
            main: '#2196F3',
          },
          secondary: {
            main: '#f44336',
          },
        },
      },
      creator: '',
      dateCreated: 0,
    };
  }

  //   handleInputChange = name: string => event: React.FormEvent<HTMLInputElement> => {
  //     this.setState({ [name]: event.target.value });
  //   };

  //   submitForm = (event: React.FormEvent<HTMLInputElement>, createCircle: boolean, data: Circle) => {
  //     event.preventDefault();
  //     if (window && !data.getUser) {
  //       window.location.href = '/login/google';
  //     }

  //     const state = this.state;

  //     let slug;
  //     let uid;
  //     let pii;
  //     let _public;

  //     if (state.slug === '') {
  //       slug = uuid();
  //     } else {
  //       slug = state.slug;
  //     }

  //     if (state.uid === '' || state.uid === null || state.uid === undefined) {
  //       uid = uuid();
  //     } else {
  //       uid = state.uid;
  //     }

  //     if (state.pii === null || state.pii === undefined) {
  //       pii = false;
  //     } else {
  //       pii = state.pii;
  //     }

  //     if (state.public === null || state.public === undefined) {
  //       _public = false;
  //     } else {
  //       _public = state.public;
  //     }

  //     const circle = {
  //       uid: uid,
  //       pii: pii,
  //       creator: data.getUser.uid,
  //       dateCreated: Date.now(),
  //       dateUpdated: Date.now(),

  //       parent: state.parent,
  //       slug: slug,
  //       public: _public,
  //       type: state.type,
  //       settings: state.settings,
  //       styles: state.styles,
  //       rating: state.rating,
  //       tags: state.tags,
  //       title: state.title,
  //       subtitle: state.subtitle,
  //       description: state.description,
  //       media: state.media,
  //       icon: state.icon,
  //       users: state.users,
  //       editors: state.editors,
  //       string: state.string,
  //       data: state.data,
  //       number: state.number,
  //       bigNumber: state.bigNumber,
  //       boolean: state.boolean,
  //       date: state.date,
  //       geoPoint: state.geoPoint,
  //       line: state.line,
  //       lines: state.lines,
  //       linesMany: state.linesMany,
  //     };

  //     const builtCircle = [
  //       Object.keys(circle).forEach(
  //         uid =>
  //           (circle[uid] === '' ||
  //             circle[uid] === null ||
  //             circle[uid] === undefined) &&
  //           delete circle[uid],
  //       ),
  //       circle,
  //     ][1];

  //     createCircle({
  //       variables: {
  //         input: builtCircle,
  //       },
  //       // refetchQueries: [{ query: GET_CIRCLES_BY_USER_KEY }],
  //     });

  //     this.setState({
  //       toCircle: true,
  //       uid: uid,
  //     });
  //   };

  handleInputChange = (
    name: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({ [name]: event.target.value } as any);
  };

  submitCircle = createCircle => {
    // const builtCircle = [
    //   Object.keys(circle).forEach(
    //     uid =>
    //       (circle[uid] === '' ||
    //         circle[uid] === null ||
    //         circle[uid] === undefined) &&
    //       delete circle[uid],
    //   ),
    //   circle,
    // ][1];

    const builtCircle = {
      id: this.state.id,
      collection: 'circles',
      title: this.state.title,
      type: this.state.type,
      data: this.state.data,
      creator: this.props.selectedProfile.id,
    };

    this.createCircle(createCircle, builtCircle);
  };

  createCircle = (createCircle, builtCircle) => {
    createCircle({
      variables: builtCircle,
      // refetchQueries: [{ query: GET_CIRCLES_BY_USER_KEY }],
    });
  };

  render() {
    //     const { toCircle, uid } = this.state;

    //     if (toCircle === true) {
    //       return <Redirect to={`/uid/${uid}`} />;
    //     }

    return (
      <Mutation mutation={CREATE_CIRCLE}>
        {createCircle => (
          <div
            style={{
              border: '1px solid lightgrey',
              borderRadius: 8,
              margin: 8,
              padding: 8,
            }}
          >
            <input
              type="text"
              value={this.state.title}
              placeholder="title"
              onChange={event => this.handleInputChange('title', event)}
            />
            <br />
            <br />
            <input
              type="text"
              value={this.state.type}
              placeholder="type"
              onChange={event => this.handleInputChange('type', event)}
            />
            <br />
            <br />
            <button onClick={() => this.submitCircle(createCircle)}>
              Create
            </button>
          </div>
        )}
      </Mutation>
      //       <Query query={GET_USER}>
      //         {({ loading, error, data }) => {
      //           if (loading) return <Progress />;
      //           if (error) return <p>`Error :( ${console.log(error)}`</p>;

      //           const { type, title, slug } = this.state;

      //           return (
      //             <Mutation mutation={CREATE_CIRCLE}>
      //               {createCircle => (
      //                 <div>
      //                   <Card
      //                     style={{
      //                       margin: '24px auto',
      //                       padding: 12,
      //                       maxWidth: 400,
      //                     }}
      //                   >
      //                     <form
      //                       onSubmit={event =>
      //                         this.submitForm(event, createCircle, data)
      //                       }
      //                     >
      //                       <TextField
      //                         id="type"
      //                         autoFocus={true}
      //                         label="Type"
      //                         value={type}
      //                         onChange={this.handleInputChange('type')}
      //                         margin="normal"
      //                         fullWidth={true}
      //                       />
      //                       <br />
      //                       <TextField
      //                         id="slug"
      //                         autoFocus={true}
      //                         label="Slug"
      //                         value={slug}
      //                         onChange={this.handleInputChange('slug')}
      //                         margin="normal"
      //                         fullWidth={true}
      //                       />
      //                       <br />
      //                       <TextField
      //                         id="title"
      //                         label="Title"
      //                         value={title}
      //                         onChange={this.handleInputChange('title')}
      //                         margin="normal"
      //                         fullWidth={true}
      //                       />
      //                       <br />
      //                       <br />
      //                       <Button
      //                         style={{ float: 'right' }}
      //                         variant="contained"
      //                         color="primary"
      //                         type="submit"
      //                       >
      //                         Add Circle
      //                       </Button>
      //                       <br />
      //                       <br />
      //                     </form>
      //                   </Card>
      //                 </div>
      //               )}
      //             </Mutation>
      //           );
      //         }}
      //       </Query>
    );
  }
}

export default CreateCircle;
