import { ICreatedCircle } from '../../../../../../types/circle';

// Make it so everything gets added at time of creation
// Do not store all that information in browsers while they are stockpiling data to send to the servers
const types: ICreatedCircle[] = [
  // {
  //   id: 'audio',
  //   title: 'Audio',
  //   icon: 'audiotrack',
  //   type: 'AUDIO',
  //   properties: ['string', 'icon', 'title'],
  //   string: '',
  // },
  // {
  //   id: 'gs-video',
  //   title: 'Google Storage Video',
  //   icon: 'video_library',
  //   type: 'IMAGE-GOOGLE-STORAGE',
  //   properties: ['string', 'icon', 'title'],
  //   string: '',
  // },
  // {
  //   id: 'video',
  //   title: 'Video',
  //   icon: 'ondemand_video',
  //   type: 'VIDEO-URL',
  //   properties: ['string', 'icon', 'title'],
  //   string: '',
  // },
  // {
  //   id: 'gs-image',
  //   title: 'Google Storage Image',
  //   icon: 'image',
  //   type: 'IMAGE-GOOGLE-STORAGE',
  //   settings: {},
  //   properties: ['string', 'icon', 'title'],
  //   string: '',
  // },
  // {
  //   id: 'image',
  //   title: 'Image',
  //   icon: 'image',
  //   type: 'IMAGE-URL',
  //   settings: {},
  //   properties: ['string', 'icon', 'title'],
  //   string: '',
  // },
  {
    id: 'lines',
    title: 'Lines',
    icon: 'view_list',
    type: 'LINES',
    properties: ['lines', 'icon', 'title'],
    lines: [],
  },
  {
    id: 'line',
    title: 'Line',
    icon: 'call_missed_outgoing',
    type: 'LINE',
    properties: ['line', 'icon', 'title'],
    line: null,
  },
  {
    id: 'object',
    title: 'Object',
    icon: 'usb',
    type: 'OBJ',
    properties: ['data', 'icon', 'title'],
    data: {},
  },
  {
    id: 'boolean',
    title: 'Boolean',
    icon: 'toggle_on',
    type: 'BOOLEAN',
    properties: ['boolean', 'icon', 'title'],
    boolean: false,
  },
  {
    id: 'number',
    title: 'Number',
    icon: 'looks_one',
    type: 'NUMBER',
    properties: ['number', 'icon', 'title'],
    number: 0,
  },
  {
    id: 'string',
    title: 'String',
    icon: 'chat',
    type: 'STRING',
    properties: ['string', 'icon', 'title'],
    string: '',
  },
  {
    id: 'geopoint',
    title: 'Geo Point',
    icon: 'gps_fixed',
    type: 'GEOPOINT',
    properties: ['geoPoint', 'icon', 'title'],
    geoPoint: {},
  },
  // {
  //   id: 'text',
  //   title: 'Text',
  //   icon: 'description',
  //   type: 'TEXT',
  //   properties: ['string', 'icon', 'title'],
  //   string: '',
  // },
  // {
  //   id: 'circle',
  //   title: 'Circle',
  //   icon: 'fiber_manual_record',
  //   type: 'CIRCLE',
  // },
  // {
  //   id: 'all-fields',
  //   icon: 'group_work',
  //   title: 'All Fields',
  //   parent: null,
  //   settings: {
  //     data: {
  //       lines: [
  //         {
  //           id: '1',
  //           type: 'TEXT',
  //           editor: {
  //             data: {},
  //           },
  //           data: {
  //             property: 'title',
  //             variant: 'body1',
  //             defaultValue: 'Some String',
  //             styles: {
  //               background: 'red',
  //             },
  //           },
  //         },
  //       ],
  //     },
  //     lines: ['1'],
  //   },
  //   type: 'ALL_FIELDS',
  //   description: 'All content types on a circle',
  // },
  // {
  //   id: 'type1',
  //   icon: 'short_text',
  //   title: 'Simple Text',
  //   parent: null,
  //   type: 'TEXT',
  //   subtitle: '',
  //   description: 'Some basic text',
  //   string: 'Untitled',
  // },
  // {
  //   id: 'type2',
  //   icon: 'list',
  //   title: 'Basic List',
  //   parent: null,
  //   type: 'LIST',
  //   subtitle: '',
  //   description: 'Some basic text',
  //   data: {
  //     list: [
  //       {
  //         id: 'lkasjdl',
  //         type: 'TEXT',
  //         string: 'First string value',
  //       },
  //       {
  //         id: '1231kj',
  //         type: 'TEXT',
  //         string: 'second string value',
  //       },
  //       {
  //         id: 'jkl103',
  //         type: 'TEXT',
  //         string: 'Third string value',
  //       },
  //     ],
  //   },
  // },
];

export default types;
