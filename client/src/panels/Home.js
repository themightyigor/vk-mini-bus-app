import React, { useContext } from 'react';
import {
  Panel,
  PanelHeader,
  FormLayout,
  FormLayoutGroup,
  SelectMimicry,
  Button,
  Div
} from '@vkontakte/vkui';
import axios from 'axios';
import Icon24Repeat from '@vkontakte/icons/dist/24/repeat';
import logo from '../logo.svg';
import { StateContext } from '../contexts/StateContext';
import Footer from '../components/Footer';

const Home = ({ navigator, id, from, to, swapValues }) => {
  const { dispatch } = useContext(StateContext);

  const fetchData = async (from, to) => {
    dispatch({ type: 'FETCH_DATA_REQUEST' });
    navigator.showLoader();
    try {
      const result = await axios(`api/departures/${from}/${to}`);
      // console.log(result.data);
      dispatch({
        type: 'FETCH_DATA_SUCCESS',
        payload: result.data.segments
      });
      console.log(result);
      navigator.go('departures');
    } catch (error) {
      navigator.hideLoader();
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

  return (
    <Panel id={id}>
      <PanelHeader>Расписание 841</PanelHeader>
      <Div style={{ textAlign: 'center', marginTop: 10 }}>
        <img width={96} height={96} src={logo} alt='logo' />
      </Div>
      <FormLayout onSubmit={onSubmit}>
        <FormLayoutGroup>
          <SelectMimicry
            data-name='from'
            top='Куда'
            onClick={e =>
              navigator.go('select', {
                state: e.currentTarget.dataset.name
              })
            }
          >
            {from.city}
          </SelectMimicry>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Icon24Repeat fill='var(--accent)' onClick={swapValues} />
          </div>
          <SelectMimicry
            data-name='to'
            top='Откуда'
            onClick={e =>
              navigator.go('select', {
                state: e.currentTarget.dataset.name
              })
            }
          >
            {to.city}
          </SelectMimicry>
        </FormLayoutGroup>
        <Button size='xl' level='primary'>
          Найти
        </Button>
      </FormLayout>
      <Footer />
    </Panel>
  );
};

export default Home;
