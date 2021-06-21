import { MenuItem } from '@blueprintjs/core';
import { ItemPredicate, ItemRenderer } from '@blueprintjs/select';
import * as React from 'react';
import { useHistory } from 'react-router';
import { CommandsProps } from '../';
import { IAppConfigContext } from '../../../components/hooks/useConfig';
import { ChangeApiUrlCommand } from './changeApiUrlCommand';
import { GoToCommand } from './goToCommand';
import { ToggleLocalizationKeysCommand } from './toggleLocalizationKeysCommand';

export type TCommandAction = (ctx: TActionContext) => CommandsProps | boolean | void;

export interface TActionContext {
  config: IAppConfigContext;
  history: ReturnType<typeof useHistory>;
}

export interface ICommand {
  action: TCommandAction;
  title: string;
  key: string;
  label?: string;
}

export const ROOT_COMMANDS: CommandsProps = {
  items: [GoToCommand, ChangeApiUrlCommand, ToggleLocalizationKeysCommand],
};

export const renderCommand: ItemRenderer<ICommand> = (command, { handleClick, modifiers, query }) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      label={command.label}
      key={command.key}
      onClick={handleClick}
      text={highlightText(command.title, query)}
    />
  );
};

export const filterCommand: ItemPredicate<ICommand> = (query, command, _index, exactMatch) => {
  if (query.length === 0 || query === '?') return true;

  const normalizedTitle = command.title.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  if (exactMatch) {
    return normalizedTitle === normalizedQuery;
  } else {
    return normalizedTitle.indexOf(normalizedQuery) >= 0;
  }
};

function highlightText(text: string, query: string) {
  if (!query || query.length === 0) return text;
  let lastIndex = 0;
  const words = query
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .map(escapeRegExpChars);
  if (words.length === 0) {
    return [text];
  }
  const regexp = new RegExp(words.join('|'), 'gi');
  const tokens: React.ReactNode[] = [];
  while (true) {
    const match = regexp.exec(text);
    if (!match) {
      break;
    }
    const length = match[0].length;
    const before = text.slice(lastIndex, regexp.lastIndex - length);
    if (before.length > 0) {
      tokens.push(before);
    }
    lastIndex = regexp.lastIndex;
    tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
  }
  const rest = text.slice(lastIndex);
  if (rest.length > 0) {
    tokens.push(rest);
  }
  return tokens;
}

function escapeRegExpChars(text: string) {
  return text.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
}
