import React, { useState } from 'react';
import {
  List,
  Cell,
  PanelHeader,
  PanelHeaderContent,
  HeaderContext
} from '@vkontakte/vkui';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import Icon24Hide from '@vkontakte/icons/dist/24/hide';
import Icon24View from '@vkontakte/icons/dist/24/view';
import Icon24Done from '@vkontakte/icons/dist/24/done';

const Header = ({ mode, setFilter, goBack }) => {
  const [context, setContext] = useState(false);

  const handleFilterSelect = e => {
    let mode = e.currentTarget.dataset.mode;
    setFilter(mode);
    requestAnimationFrame(() => setContext(false));
  };

  return (
    <>
      <PanelHeader left={<PanelHeaderBack onClick={() => goBack()} />}>
        <PanelHeaderContent
          onClick={() => setContext(!context)}
          aside={<Icon16Dropdown />}
        >
          Отправление
        </PanelHeaderContent>
      </PanelHeader>
      <HeaderContext opened={context} onClose={() => setContext(false)}>
        <List>
          <Cell
            before={<Icon24View fill='var(--accent)' />}
            asideContent={
              mode === 'all' ? <Icon24Done fill='var(--accent)' /> : null
            }
            onClick={handleFilterSelect}
            data-mode='all'
          >
            Показать все
          </Cell>
          <Cell
            before={<Icon24Hide fill='var(--accent)' />}
            asideContent={
              mode === 'hide' ? <Icon24Done fill='var(--accent)' /> : null
            }
            onClick={handleFilterSelect}
            data-mode='hide'
          >
            Скрыть ушедшие
          </Cell>
        </List>
      </HeaderContext>
    </>
  );
};

export default Header;
