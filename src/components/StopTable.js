import React from 'react';
import { List, Cell } from '@vkontakte/vkui';
import './StopTable.css';

const StopTable = ({ stops }) => {
  return (
    <>
      <List>
        <Cell>
          <div className='stop_table__item'>
            <div className='stop_table__item__title stop_table__header'>
              Остановка
            </div>
            <div className='stop_table__item__departure stop_table__header'>
              Отправление
            </div>
          </div>
        </Cell>
        {stops.map((stop, index) => {
          return (
            <Cell key={index} multiline>
              <div className='stop_table__item'>
                <div className='stop_table__item__title'>
                  {stop.station.title}
                </div>
                <div className='stop_table__item__departure'>
                  {stop.departure
                    ? stop.departure.slice(10, -3)
                    : stop.arrival.slice(10, -3)}
                </div>
              </div>
            </Cell>
          );
        })}
      </List>
    </>
  );
};

export default StopTable;
