import Leaflet from 'leaflet'
import {render} from 'react-dom'

const initialState = {
    mapInstance:null,
    userLocation: [0,0],
    markers:[]
};

export default function ui(state = initialState, action) {
    switch (action.type) {

        case "LOCATION_WAIT":
            return {...state}

        case "LOCATION_OK":
            var coords = [action.location.coords.latitude,action.location.coords.longitude-0.08];
            console.log(coords);
            state.mapInstance.setView( coords, 11 );
            return { ...state, userLocation:coords }

        case "LOCATION_ERR":
            console.error(action.payload);
            return {...state}


        case "CREATE_MAP":
            var map = Leaflet.map('map');
            Leaflet.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGFmb2VkIiwiYSI6ImNqMHA2MHk5ODAwMDgzMnFxamQyNmVha3IifQ.8r9fW0pPDrNW7iwBqkVhhg')
                .addTo(map);
            return { ...state, mapInstance:map }

        case "ADD_MARKERS":
            var {events, popupRender} = action.payload;
            var markers = events.map(event=>{
                var marker = Leaflet.marker(event.coords).addTo(state.mapInstance);
                var elem = render( popupRender(event), document.createElement('div') );
                marker.bindPopup( elem );
                marker.id = event._id;
                return marker;
            })
            return {...state, markers:markers};

        default:
            return {...state};
    }
}



