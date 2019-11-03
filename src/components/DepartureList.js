import React from 'react';
import { Group, Footer, List, Cell, Tooltip } from '@vkontakte/vkui';
import persik from '../img/persik.png';

const DepartureList = ({
  departures,
  mode,
  error,
  tooltip,
  toggleTooltip,
  goNext
}) => {
  const renderCell = (departure, uid, days) => {
    return (
      <Cell
        onClick={() => goNext('details', uid)}
        description={days}
        expandable
        key={uid}
      >
        {departure.slice(0, -3)}
      </Cell>
    );
  };

  return (
    <>
      {(mode === 'hide' && !departures.length) || error ? (
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
              {departures.map((departure, index) =>
                index === 0 ? (
                  <Tooltip
                    key={index}
                    text='Для просмотра деталей нажмите на ячейку со временем'
                    isShown={tooltip}
                    onClose={() => toggleTooltip()}
                    offsetX={10}
                  >
                    {renderCell(
                      departure.departure,
                      departure.thread.uid,
                      departure.days
                    )}
                  </Tooltip>
                ) : (
                  renderCell(
                    departure.departure,
                    departure.thread.uid,
                    departure.days
                  )
                )
              )}
            </List>
          </Group>
          <Footer>Найдено рейсов: {departures.length}</Footer>
        </>
      )}
    </>
  );
};

export default DepartureList;
