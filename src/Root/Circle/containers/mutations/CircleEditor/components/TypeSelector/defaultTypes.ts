import { ICreatedCircle } from '../../../../../../../../customTypeScriptTypes/circle.d';

const types: ICreatedCircle[] = [
  {
    id: 'all-fields',
    icon: 'group_work',
    title: 'All Fields',
    parent: null,
    settings: {
      data: {
        lines: [
          {
            id: '1',
            type: 'TEXT',
            editor: {
              data: {},
            },
            data: {
              property: 'title',
              variant: 'body1',
              defaultValue: 'Some String',
              styles: {
                background: 'red',
              },
            },
          },
        ],
      },
      lines: ['1'],
    },
    type: 'ALL_FIELDS',
    description: 'All content types on a circle',
  },
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
