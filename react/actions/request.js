import axios from 'axios'

export function get( name, options ) {
    return (dispatch) => {
        dispatch({
            type: "GET_WAIT",
            payload: name
        });
        axios( "api/"+name, options )
            .then(({data})=>{
                dispatch({
                    type: "GET_OK",
                    payload: data,
                    name:name
                });
            })
            .catch(err=>{
                dispatch({
                    type: "GET_ERR",
                    payload: err,
                    name:name
                })
            })
    }
}

export function saveEvent( event ) {
    return (dispatch) => {
        dispatch({
            type: "SAVE_EVENT_WAIT",
            payload: event
        });
        axios( "api/events", {method:"post",data:event} )
            .then(({data})=>{
                dispatch({
                    type: "SAVE_EVENT_OK",
                    payload: event
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

