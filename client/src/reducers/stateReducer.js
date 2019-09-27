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
      let newMode = action.payload;

      if (newMode === draft.mode) {
        return;
      }
      draft.mode = newMode;

      let tempDepartures = draft.departures;

      if (newMode !== 'all') {
        let date = new Date();
        let formattedDate = date.toDateString();

        tempDepartures = tempDepartures.filter(
          schedule =>
            Date.parse(`${formattedDate} ${schedule.departure}`) > date
        );
      }

      draft.sortedDepartures = tempDepartures;
      return;
    }
    case 'TOGGLE_TOOLTIP': {
      draft.tooltip = false;
      return;
    }
    default:
      return;
  }
};
