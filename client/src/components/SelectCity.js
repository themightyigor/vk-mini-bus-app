import React from 'react';
import { Group, List, PanelHeader, Cell } from '@vkontakte/vkui';
import Icon24Done from '@vkontakte/icons/dist/24/done';

const cities = [
  {
    name: 'Кингисепп',
    code: 'c10870'
  },
  {
    name: 'Санкт-Петербург',
    code: 'c2'
  }
];

const SelectCity = props => {
  const route = props.route;
  const activeCity = route.params.state === 'from' ? props.from : props.to;

  const renderCell = (city, code) => {
    return (
      <Cell
        key={code}
        onClick={() => {
          props.handleCitySelect(route.params.state, city, code);
        }}
        asideContent={
          activeCity === city ? <Icon24Done fill='var(--accent)' /> : null
        }
      >
        {city}
      </Cell>
    );
  };

  return (
    <div>
      <PanelHeader>
        {route.name === 'from'
          ? 'Выберите место отправления'
          : 'Выберите место назначения'}
      </PanelHeader>
      <Group>
        <List>{cities.map(city => renderCell(city.name, city.code))}</List>
      </Group>
    </div>
  );
};

export default SelectCity;
