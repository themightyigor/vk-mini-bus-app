import React from 'react';
import { useImmerReducer } from 'use-immer';
import { stateReducer } from '../reducers/stateReducer';

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

const StateProvider = props => {
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
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {props.children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default StateProvider;
