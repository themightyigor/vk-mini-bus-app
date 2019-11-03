import React, { useContext, useState } from 'react';
import {
  Panel,
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
import { StateContext, DispatchContext } from '../contexts/StateContext';
import DepartureList from '../components/DepartureList';

const Departures = ({ id, navigator }) => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const { departures, mode, error, tooltip } = state;

  const [context, setContext] = useState(false);

  const getVisibleDepartures = (departures, mode) => {
    switch (mode) {
      case 'all':
        return departures;
      case 'hide':
        let date = new Date();
        let formattedDate = date.toDateString();

        return departures.filter(
          schedule =>
            Date.parse(`${formattedDate} ${schedule.departure}`) > date
        );
      default:
        throw new Error(`Unknown mode: ${mode}`);
    }
  };

  const handleFilterSelect = e => {
    let mode = e.currentTarget.dataset.mode;

    dispatch({ type: 'SET_FILTER', payload: mode });
    requestAnimationFrame(() => setContext(false));
  };

  const toggleTooltip = () => dispatch({ type: 'TOGGLE_TOOLTIP' });
  const goNext = (panel, uid) => navigator.go(panel, { uid });

  const visibleDepartures = getVisibleDepartures(departures, mode);

  return (
    <Panel id={id}>
      <PanelHeader
        left={
          <PanelHeaderBack
            onClick={() => {
              navigator.goBack();
              dispatch({ type: 'SET_INITIAL_MODE' });
            }}
          />
        }
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
      <DepartureList
        departures={visibleDepartures}
        mode={mode}
        error={error}
        tooltip={tooltip}
        toggleTooltip={toggleTooltip}
        goNext={goNext}
      />
    </Panel>
  );
};

export default Departures;
