import { IEditingCircle } from '../../../../types/circle';

export function defaultSettings(selectedProfileId: string): IEditingCircle {
  return {
    id: 'settings',
    public: true,
    creator: selectedProfileId,
    owner: selectedProfileId,
    settings: 'settings',
    title: 'Settings',
    description: 'A settings circle that contains a list of settings items.',
    icon: 'settings',
    type: 'LINES',
    lines: ['layout'],
  };
}
