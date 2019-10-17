import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PanelHeader,
  Footer,
  Spinner,
  Group,
  Cell,
  Panel,
  List
} from '@vkontakte/vkui';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import Icon24Info from '@vkontakte/icons/dist/24/info';
import Icon24Recent from '@vkontakte/icons/dist/24/recent';
import MapWithADirectionsRenderer from '../components/Map';
import StopTable from '../components/StopTable';

const initialDetailsState = {
  details: {},
  loading: true
};

const ScheduleDetail = ({ id, navigator }) => {
  const [details, setDetails] = useState(initialDetailsState);
  useEffect(() => {
    axios
      .get(`api/details/${navigator.params.uid}`)
      .then(res => {
        setDetails(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Panel id={id}>
      <PanelHeader
        left={<PanelHeaderBack onClick={() => navigator.goBack()} />}
      >
        Детали
      </PanelHeader>
      {details.loading ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <Spinner size='small' style={{ marginTop: '20px' }} />
        </div>
      ) : (
        <>
          <Group title='Информация'>
            <List>
              <Cell multiline before={<Icon24Info />}>{`${
                details.title
              } ${details.number && `№${details.number}`}`}</Cell>
              <Cell before={<Icon24Recent />}>{details.days}</Cell>
            </List>
          </Group>

          <Group title='Маршрут следования'>
            <StopTable stops={details.stops} />
          </Group>
          <Footer>
            Часто автобусы опаздывают или приходят раньше. Обычно стоянка
            транзитного автобуса — 2–5 минуты.
          </Footer>
          <Group title='Примерный маршрут'>
            <MapWithADirectionsRenderer stops={details.stops} />
          </Group>
        </>
      )}
    </Panel>
  );
};

export default ScheduleDetail;
