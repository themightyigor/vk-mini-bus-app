import React, { useContext, useState } from 'react';
import {
  Panel,
  Group,
  Footer,
  List,
  Cell,
  Tooltip,
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
import persik from '../img/persik.png';

const Departures = ({ id, navigator }) => {
  const state = useContext(StateContext);
  console.log(state);
  const dispatch = useContext(DispatchContext);
  const { departures, sortedDepartures, mode, error, tooltip } = state;

  const [context, setContext] = useState(false);

  const handleFilterSelect = e => {
    let mode = e.currentTarget.dataset.mode;

    let tempDepartures = [...departures];

    // Filter by outbound departure time
    if (mode === 'hide') {
      let date = new Date();
      let formattedDate = date.toDateString();

      tempDepartures = tempDepartures.filter(
        schedule => Date.parse(`${formattedDate} ${schedule.departure}`) > date
      );
    }

    dispatch({ type: 'SET_FILTER', payload: { mode, tempDepartures } });
    requestAnimationFrame(() => setContext(false));
  };

  const renderCell = (departure, uid) => {
    return (
      <Cell
        onClick={() => navigator.go('details', { uid })}
        description={departure.isTransit ? 'транзитный' : null}
        expandable
        key={uid}
      >
        {departure.slice(0, -3)}
      </Cell>
    );
  };

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

      {(mode === 'hide' && !sortedDepartures.length) || error ? (
        <>
          <img
            className='Persik'
            style={{
              display: 'block',
              width: '50%',
              maxWidth: '240px',
              margin: '20px auto'
            }}
            src={persik}
            alt='Persik The Cat'
          />
          <Footer>
            {error ? 'Ошибка сервера' : 'К сожалению, все рейсы уже ушли'}
          </Footer>
        </>
      ) : (
        <>
          <Group title='Время и дни отправления'>
            <List>
              {sortedDepartures.map((departure, index) =>
                index === 0 ? (
                  <Tooltip
                    key={index}
                    text='Для просмотра деталей нажмите на ячейку со временем'
                    isShown={tooltip}
                    onClose={() => dispatch({ type: 'TOGGLE_TOOLTIP' })}
                    offsetX={10}
                  >
                    {renderCell(departure.departure, departure.thread.uid)}
                  </Tooltip>
                ) : (
                  renderCell(departure.departure, departure.thread.uid)
                )
              )}
            </List>
          </Group>
          <Footer>Найдено рейсов: {sortedDepartures.length}</Footer>
        </>
      )}
    </Panel>
  );
};

export default Departures;
