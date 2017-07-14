

export function getUserCoords() {
    return (dispatch) => {
        dispatch({
            type: "LOCATION_WAIT"
        });
        userGeolocation()
            .then(location=>{
                dispatch({
                    type: "LOCATION_OK",
                    payload: location
                });
            })
            .catch(err=>{
                dispatch({
                    type: "LOCATION_ERR",
                    payload: err
                })
            })
    }
}



function userGeolocation(){
    return new Promise((resolve,reject)=>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    })
}


export function editEvent(data){
    return (dispatch) => {
        dispatch({
            type: "EDIT_EVENT",
            payload:data
        });
    }
}

export function setMapView(data){
    return (dispatch) => {
        dispatch({
            type: "SET_MAP_VIEW",
            payload:data
        });
    }
}

export function saveEvent(event){
    return (dispatch) => {
        dispatch({
            type: "SAVE_EVENT_WAIT"
        });
        var Event = Parse.Object.extend("Event");
        //default image
        event.img = "http://www.material-ui.com/images/grid-list/water-plant-821293_640.jpg";
        var newEvent = new Event(event);
        newEvent.save().then(resp=>{
                dispatch({
                    type: "SAVE_EVENT_OK",
                    payload: resp
                });
            })
            .catch(err=>{
                dispatch({
                    type: "SAVE_EVENT_ERR",
                    payload: err
                })
            })
    }
}
