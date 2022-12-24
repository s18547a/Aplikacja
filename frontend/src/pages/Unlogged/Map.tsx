import { GoogleMap, withScriptjs } from 'react-google-maps';
import withGoogleMap from 'react-google-maps/lib/withGoogleMap';

function MapComponent() {
	const Map = withScriptjs(
		withGoogleMap((props) => {
			<GoogleMap
				defaultZoom={8}
				defaultCenter={{ lat: 52.24579, lng: 20.95971 }}
			/>;
		})
	);

	return (
		<Map
			googleMapURL={`https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&v=3.exp&libraries=geometry,drawing,places`}
			loadingElement={<div style={{ height: `100%` }} />}
			containerElement={<div style={{ height: `400px` }} />}
			mapElement={<div style={{ height: `100%` }} />}
		/>
	);
}
export default MapComponent;
