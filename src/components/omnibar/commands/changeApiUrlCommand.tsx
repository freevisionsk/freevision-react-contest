import { MenuItem } from '@blueprintjs/core';
import { ICommand } from './index';
import { CommandsProps } from '..';

const buildEnvAction = (title: string, url?: string): ICommand => ({
  action: ({ config: ctx }) => {
    if (url) {
      ctx.set('apiUrl', url);
    } else {
      ctx.reset('apiUrl');
    }
    return false;
  },
  key: title.toLowerCase(),
  title,
  label: url,
});

const CHANGE_API_URL_COMMANDS: CommandsProps = {
  initialContent: <MenuItem disabled text="Type '?' to list all options" />,
  inputProps: {
    leftIcon: 'chevron-right',
    placeholder: 'Select environment',
  },
  items: [
    buildEnvAction('reset'),
    buildEnvAction('localhost', 'http://localhost:3000'),
    buildEnvAction('staging', 'https://staging.fake-application.net'),
    buildEnvAction('staging2', 'https://staging2.fake-application.net'),
    buildEnvAction('production', 'https://production.fake-application.net'),
  ],
  createNewItemFromQuery: (query: string) => {
    return buildEnvAction('custom', query);
  },
};

export const ChangeApiUrlCommand: ICommand = {
  action: () => CHANGE_API_URL_COMMANDS,
  title: 'Change API url',
  key: 'ChangeApiUrl',
};
