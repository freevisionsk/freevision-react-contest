import { MenuItem } from '@blueprintjs/core';
import { CommandsProps } from '..';
import { ICommand } from './';

const buildGoToAction = (title: string, url: string): ICommand => ({
  action: ({ history }) => {
    history.push(url);
    return true;
  },
  key: title.toLowerCase(),
  title,
  label: url,
});

const GO_TO_COMMANDS: CommandsProps = {
  initialContent: <MenuItem disabled text="Type '?' to list all options" />,
  inputProps: {
    leftIcon: 'chevron-right',
    placeholder: 'Select page',
  },
  items: [buildGoToAction('Home', '/'), buildGoToAction('Page one', '/one'), buildGoToAction('Page two', '/two')],
};

export const GoToCommand: ICommand = {
  action: () => GO_TO_COMMANDS,
  title: 'Go to',
  key: 'GoTo',
};
