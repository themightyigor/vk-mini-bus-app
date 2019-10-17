import React from 'react';
import { Group, List, Panel, PanelHeader, Cell } from '@vkontakte/vkui';
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

const SelectCity = ({ navigator, id, cityFrom, cityTo, handleCitySelect }) => {
  const activeCity = navigator.params.state === 'from' ? cityFrom : cityTo;
  console.log(navigator);

  const renderCell = (city, code) => {
    return (
      <Cell
        key={code}
        onClick={() => {
          // console.log(city);
          handleCitySelect(navigator.params.state, city, code);
          navigator.goBack();
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
    <Panel id={id}>
      <PanelHeader>
        {navigator.params.state === 'from' ? 'Откуда' : 'Куда'}
      </PanelHeader>
      <Group>
        <List>{cities.map(city => renderCell(city.name, city.code))}</List>
      </Group>
    </Panel>
  );
};

export default SelectCity;
