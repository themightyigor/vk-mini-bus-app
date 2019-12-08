import React, { useContext, useCallback, useMemo } from 'react';
import { Panel } from '@vkontakte/vkui';
import { StateContext, DispatchContext } from '../contexts/StateContext';
import Header from '../components/Header';
import DepartureList from '../components/DepartureList';

const getVisibleDepartures = (departures, mode) => {
  switch (mode) {
    case 'all':
      return departures;
    case 'hide':
      let date = new Date();
      let formattedDate = date.toDateString();
      return departures.filter(
        schedule => Date.parse(`${formattedDate} ${schedule.departure}`) > date
      );
    default:
      throw new Error(`Unknown mode: ${mode}`);
  }
};

const Departures = ({ id, navigator }) => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const { departures, mode, error, tooltip } = state;

  const toggleTooltip = useCallback(() => {
    dispatch({ type: 'TOGGLE_TOOLTIP' });
  }, []);

  const setFilter = useCallback(
    mode => {
      dispatch({ type: 'SET_FILTER', payload: mode });
    },
    [mode]
  );

  const goNext = useCallback((panel, uid) => {
    navigator.go(panel, { uid });
  }, []);

  const goBack = useCallback(() => {
    navigator.goBack();
    dispatch({ type: 'SET_INITIAL_MODE' });
  }, []);

  const visibleDepartures = useMemo(() => {
    return getVisibleDepartures(departures, mode);
  }, [departures, mode]);

  return (
    <Panel id={id}>
      <Header mode={mode} setFilter={setFilter} goBack={goBack} />
      <DepartureList
        departures={visibleDepartures}
        mode={mode}
        error={error}
        tooltip={tooltip}
        toggleTooltip={toggleTooltip}
        goNext={goNext}
      />
    </Panel>
  );
};

export default Departures;
