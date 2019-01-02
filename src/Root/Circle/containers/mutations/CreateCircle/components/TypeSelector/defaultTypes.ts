const types: ICreatedCircle[] = [
  {
    id: 'type1',
    icon: 'short_text',
    title: 'Simple Text',
    type: 'STRING',
    subtitle: '',
    description: 'Some basic text',
    string: 'Untitled',
  },
  {
    id: 'type2',
    icon: 'list',
    title: 'Basic List',
    type: 'LIST',
    subtitle: '',
    description: 'Some basic text',
    data: {
      list: ['listItem 1', 'listItem 2'],
    },
  },
];

export default types;
