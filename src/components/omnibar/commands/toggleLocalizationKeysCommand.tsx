import { ICommand } from './index';

export const ToggleLocalizationKeysCommand: ICommand = {
  action: ({ config: ctx }) => {
    ctx.set('showLangKeys', !ctx.config.showLangKeys);
  },
  title: 'Toggle localizations',
  key: 'ToggleLocalizationKeys',
};
