import React, { useContext } from 'react';
import { StateContext } from '../contexts/StateContext';
import persik from '../img/persik.png';
import { Group, Footer, List, Cell, Tooltip } from '@vkontakte/vkui';

const Departures = ({ router }) => {
  const {
    dispatch,
    state: { sortedDepartures, mode, error, tooltip }
  } = useContext(StateContext);

  const renderCell = (departure, uid) => {
    return (
      <Cell
        onClick={() =>
          router.navigate('details', {
            uid: uid
          })
        }
        description={departure.isTransit ? 'транзитный' : null}
        expandable
        key={uid}
      >
        {departure.slice(0, -3)}
      </Cell>
    );
  };

  if ((mode === 'hide' && !sortedDepartures.length) || error) {
    return (
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
    );
  }

  return (
    <>
      {' '}
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
  );
};

export default Departures;
