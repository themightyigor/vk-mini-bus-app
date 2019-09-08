import React from 'react';
import { useImmerReducer } from 'use-immer';
import { stateReducer } from '../reducers/stateReducer';

export const StateContext = React.createContext();

const StateContextProvider = props => {
  let initialState = {
    departures: [],
    sortedDepartures: [],
    loading: false,
    error: false,
    mode: 'all',
    tooltip: true
  };

  const [state, dispatch] = useImmerReducer(stateReducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
