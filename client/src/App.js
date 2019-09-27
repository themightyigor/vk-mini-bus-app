import React, { useState, useContext } from 'react';
import {
  View,
  Panel,
  ScreenSpinner,
  PanelHeader,
  Div,
  Root
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import axios from 'axios';
import logo from './logo.svg';
import { useRouteNode } from 'react-router5';
import SearchForm from './components/SearchForm';
import SelectCity from './components/SelectCity';
import { StateContext } from './contexts/StateContext';
import ScheduleDetail from './panels/ScheduleDetail';
import Departures from './panels/Departures';
import DeparturesFilter from './panels/DeparturesFilter';
import Footer from './components/Footer';

const App = () => {
  let initialFromState = {
    code: 'c10870',
    city: 'Кингисепп'
  };
  let initialToState = {
    code: 'c2',
    city: 'Санкт-Петербург'
  };

  const { route, router } = useRouteNode('');
  const {
    state: { loading },
    dispatch
  } = useContext(StateContext);

  const [from, setFrom] = useState(initialFromState);
  const [to, setTo] = useState(initialToState);

  const fetchData = async (from, to) => {
    dispatch({ type: 'FETCH_DATA_REQUEST' });
    try {
      const result = await axios(`api/departures/${from}/${to}`);
      // console.log(result.data);
      dispatch({
        type: 'FETCH_DATA_SUCCESS',
        payload: result.data.segments
      });
      router.navigate('departures');
    } catch (error) {
      dispatch({ type: 'FETCH_DATA_ERROR' });
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    if (from.code === to.code) {
      return;
    }
    fetchData(from.code, to.code);
  };

  const handleCitySelect = (state, city, code) => {
    state === 'from' ? setFrom({ code, city }) : setTo({ code, city });
    router.navigate('home');
    // console.log(from);
  };

  const swapValues = () => {
    setFrom(to);
    setTo(from);
  };

  const activeView = route.name === 'select' ? 'selectView' : 'homeView';
  const activePanel = route.name;

  return (
    <Root popout={loading ? <ScreenSpinner /> : null} activeView={activeView}>
      <View activePanel={activePanel} id='homeView'>
        <Panel id='home'>
          <PanelHeader>Расписание 841</PanelHeader>
          <Div style={{ textAlign: 'center', marginTop: 10 }}>
            <img width={96} height={96} src={logo} alt='logo' />
          </Div>
          <SearchForm
            onSubmit={onSubmit}
            from={from}
            to={to}
            swapValues={swapValues}
            router={router}
          />
          <Footer />
        </Panel>

        <Panel id='departures'>
          <DeparturesFilter router={router} />
          <Departures route={route} router={router} />
        </Panel>
        <Panel id='details'>
          <ScheduleDetail route={route} router={router} />
        </Panel>
      </View>
      <View activePanel={activePanel} id='selectView'>
        <Panel id='select'>
          <SelectCity
            handleCitySelect={handleCitySelect}
            route={route}
            from={from.city}
            to={to.city}
          />
        </Panel>
      </View>
    </Root>
  );
};

export default App;
