import { IEditingCircle } from '../../../../types/circle';

export function defaultSettings(
  overrideProperties?: IEditingCircle,
): IEditingCircle {
  return {
    id: 'layout',
    public: true,
    settings: 'settings',
    title: 'Layout',
    subtitle: 'A responsive layout',
    type: 'LAYOUT',
    description:
      'This is a base responsive layout that works at xsmall, small, medium, large, xlarge',
    data: {},
  };
}
