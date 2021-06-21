import { Menu, MenuItem } from '@blueprintjs/core';
import { Omnibar as OGOmnibar, OmnibarProps } from '@blueprintjs/select';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useConfig } from '../../components/hooks/useConfig';
import { filterCommand, ICommand, renderCommand, ROOT_COMMANDS } from './commands';

const CommandsOmnibar = OGOmnibar.ofType<ICommand>();

export type CommandsProps = Partial<OmnibarProps<ICommand>>;

const Omnibar = () => {
  const history = useHistory();
  const cfg = useConfig();
  const [visible, setVisible] = useState(false);
  const handleKey = useCallback((ev: KeyboardEvent) => {
    // Ctrl + .
    if (ev.code === 'Period' && ev.ctrlKey) setVisible((v) => !v);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [handleKey]);

  const [props, setProps] = useState(ROOT_COMMANDS);

  return (
    <CommandsOmnibar
      inputProps={{
        leftIcon: 'chevron-right',
        placeholder: 'Enter command...',
      }}
      isOpen={visible}
      itemPredicate={filterCommand}
      itemRenderer={renderCommand}
      itemListRenderer={({ renderItem, filteredItems, itemsParentRef, query }) => {
        if (filteredItems.length === 0) {
          const message = query.length > 0 ? 'No command matching search' : 'No available commands';
          return (
            <Menu ulRef={itemsParentRef as any}>
              <MenuItem disabled={true} text={message} />
            </Menu>
          );
        }
        return <Menu ulRef={itemsParentRef as any}>{filteredItems.map(renderItem)}</Menu>;
      }}
      items={[]}
      itemsEqual={(a, b) => a.key === b.key}
      noResults={<MenuItem disabled={true} text="No command matching search" />}
      resetOnQuery
      resetOnSelect
      onClose={() => {
        setProps(ROOT_COMMANDS);
        setVisible(false);
      }}
      onItemSelect={(cmd) => {
        const res = cmd.action({ config: cfg, history });
        if (res === false) return;
        if (res === true) {
          setProps(ROOT_COMMANDS);
          setVisible(false);
          return;
        }
        if (res) {
          setProps(res);
        } else {
          setVisible(false);
        }
      }}
      {...props}
    />
  );
};

export default Omnibar;
