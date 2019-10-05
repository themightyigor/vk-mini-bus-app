import React, { useEffect, useContext, useState } from 'react';
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

  useEffect(() => {
    return () => {
      console.log('Component will unmount');
      dispatch({ type: 'SET_INITIAL_MODE' });
    };
  }, []);

  let {
    dispatch,
    state: { mode, departures }
  } = useContext(StateContext);
  // console.log(mode);

  const handleFilterSelect = e => {
    let mode = e.currentTarget.dataset.mode;

    if (mode === 'hide') {
      let date = new Date();
      let formattedDate = date.toDateString();
      departures = departures.filter(
        schedule => Date.parse(`${formattedDate} ${schedule.departure}`) > date
      );
    }

    dispatch({ type: 'SET_FILTER', payload: { mode, departures } });
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
