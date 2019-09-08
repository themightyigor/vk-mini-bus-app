import React from 'react';
const { compose, withProps, lifecycle } = require('recompose');
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} = require('react-google-maps');
const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=AIzaSyBc3bsKQXVsZ-P-MRqPQyIiW1xwi_HEGZw&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new window.google.maps.DirectionsService();
      const { stops } = this.props;
      const waypoints = stops.map(stop => stop.station.title);
      //  console.log(waypoints);
      DirectionsService.route(
        {
          origin: waypoints[0],
          waypoints: waypoints
            .slice(1, waypoints.length - 1)
            .map(location => ({ location, stopover: true })),
          destination: waypoints[waypoints.length - 1],
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  })
)(props => (
  <div>
    <GoogleMap
      defaultZoom={8}
      defaultCenter={new window.google.maps.LatLng(59.3628097, 28.5400579)}
    >
      {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
  </div>
));

export default MapWithADirectionsRenderer;
