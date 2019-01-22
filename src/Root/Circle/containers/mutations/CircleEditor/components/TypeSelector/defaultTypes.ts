import { ICreatedCircle } from '../../../../../../../../customTypeScriptTypes/circle.d';

const types: ICreatedCircle[] = [
  {
    id: 'type1',
    icon: 'short_text',
    title: 'Simple Text',
    parent: null,
    type: 'TEXT',
    subtitle: '',
    description: 'Some basic text',
    string: 'Untitled',
  },
  {
    id: 'type2',
    icon: 'list',
    title: 'Basic List',
    parent: null,
    type: 'LIST',
    subtitle: '',
    description: 'Some basic text',
    data: {
      list: [
        {
          id: 'lkasjdl',
          type: 'TEXT',
          string: 'First string value',
        },
        {
          id: '1231kj',
          type: 'TEXT',
          string: 'second string value',
        },
        {
          id: 'jkl103',
          type: 'TEXT',
          string: 'Third string value',
        },
      ],
    },
  },
];

export default types;
