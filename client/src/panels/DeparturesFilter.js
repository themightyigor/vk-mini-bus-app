import React, { useContext, useState } from 'react';
import { StateContext } from '../contexts/StateContext';
import {
  Cell,
  PanelHeader,
  HeaderContext,
  PanelHeaderContent,
  List
} from '@vkontakte/vkui';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import Icon24Hide from '@vkontakte/icons/dist/24/hide';
import Icon24View from '@vkontakte/icons/dist/24/view';
import Icon24Done from '@vkontakte/icons/dist/24/done';

const DeparturesFilter = React.memo(({ router }) => {
  const [context, setContext] = useState(false);
  const {
    dispatch,
    state: { mode }
  } = useContext(StateContext);
  // console.log(mode);

  const handleFilterSelect = e => {
    const mode = e.currentTarget.dataset.mode;

    dispatch({ type: 'SET_FILTER', payload: mode });
    requestAnimationFrame(() => setContext(false));
  };

  return (
    <>
      <PanelHeader
        left={<PanelHeaderBack onClick={() => router.navigate('home')} />}
      >
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
});

export default DeparturesFilter;