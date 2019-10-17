import React from 'react';
import { Stack, Page } from 'vkui-navigator/dist';
import '@vkontakte/vkui/dist/vkui.css';
import Home from './panels/Home';
import Departures from './panels/Departures';
import ScheduleDetail from './panels/ScheduleDetail';
import SelectCity from './panels/SelectCity';
import useForm from './hooks/useForm';

const App = () => {
  const [from, to, swapValues, handleCitySelect] = useForm();

  return (
    <Stack activePage='homePage'>
      <Page id='homePage' activePanel='home'>
        <Home id='home' from={from} to={to} swapValues={swapValues} />
        <Departures id='departures' />
        <ScheduleDetail id='details' />
        <SelectCity
          id='select'
          cityFrom={from.city}
          cityTo={to.city}
          handleCitySelect={handleCitySelect}
        />
      </Page>
    </Stack>
  );
};

export default App;
