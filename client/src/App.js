import React from 'react';
import { Stack, Page } from 'vkui-navigator/dist';
import '@vkontakte/vkui/dist/vkui.css';
import SelectCity from './components/SelectCity';
import ScheduleDetail from './panels/ScheduleDetail';
import Departures from './panels/Departures';
import Home from './panels/Home';
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
