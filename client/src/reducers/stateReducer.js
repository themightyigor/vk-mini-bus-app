export const stateReducer = (draft, action) => {
  switch (action.type) {
    case 'FETCH_DATA_SUCCESS': {
      draft.departures = action.payload;
      draft.sortedDepartures = action.payload;
      draft.loading = false;
      draft.error = false;
      return;
    }
    case 'FETCH_DATA_REQUEST': {
      draft.loading = true;
      return;
    }
    case 'FETCH_DATA_ERROR': {
      draft.error = true;
      draft.loading = false;
      return;
    }
    case 'SET_FILTER': {
      let { mode, date, formattedDate } = action.payload;

      if (mode === draft.mode) {
        return;
      }

      let tempDepartures = draft.departures;

      if (mode === 'hide') {
        tempDepartures = tempDepartures.filter(
          schedule =>
            Date.parse(`${formattedDate} ${schedule.departure}`) > date
        );
      }

      draft.mode = mode;
      draft.sortedDepartures = tempDepartures;
      return;
    }
    case 'TOGGLE_TOOLTIP': {
      draft.tooltip = false;
      return;
    }
    case 'SET_INITIAL_MODE': {
      draft.mode = 'all';
      draft.sortedDepartures = [];
      draft.departures = [];
      return;
    }
    default:
      return;
  }
};
