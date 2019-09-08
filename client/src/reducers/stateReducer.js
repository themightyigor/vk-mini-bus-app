export const stateReducer = (draft, action) => {
  switch (action.type) {
    case 'FETCH_DATA_SUCCESS': {
      let formatData = data => {
        const regExp = /[—,-]/;
        let splitTitle = title => title.split(regExp)[0].trim();
        let origin = splitTitle(data.search.from.title);
        let tempData = data.segments.map(item => {
          let from = splitTitle(item.thread.title);
          let isTransit = from !== origin;
          let segment = { ...item, isTransit };
          return segment;
        });
        return tempData;
      };

      let schedules = formatData(action.payload);
      draft.departures = schedules;
      draft.sortedDepartures = schedules;
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
      const newMode = action.payload;

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
