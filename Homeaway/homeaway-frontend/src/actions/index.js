import {ROOT_URL as root} from "../config";
import axios from "axios";

export const SUBMIT_LOGIN = "submit_login";
export const CREATE_USER = "create_user";
export const SEARCH_PROPERTIES = "search_properties";
export const UPDATE_PROFILE = "update_profile";
export const GET_PROFILE = "get_profile";
export const GET_PROFILE_PIC = "get_profile_pic";
export const OWNER_PROPERTIES = "owner_properties";
export const USER_BOOKINGS = "user_bookings";
export const OWNER_BOOKINGS = "owner_bookings";
export const UPLOAD = "uplaod";

const ROOT_URL = root;


export function submitlogin(values,callback) {
    console.log(values);
    axios.defaults.withCredentials = true;

    const request = axios
        .post(`${ROOT_URL}/login`, values);

    return (dispatch) =>
    {
     request.then( (res) => {
             console.log("In login response is : " + JSON.stringify(res));
             dispatch(
                 {
                     type: SUBMIT_LOGIN,
                     payload: res.data
                 });
             callback(res);
         }
     );

    };
}

export function submitsignup(values,callback) {
    console.log(values);
    axios.defaults.withCredentials = true;
    const request = axios
        .post(`${ROOT_URL}/createuser`, values);

    return (dispatch) =>
    {
        request.then( (res) => {
                console.log("In login response is : " + JSON.stringify(res));
                dispatch(
                    {
                        type: CREATE_USER,
                        payload: res.data
                    });
                callback(res);
            }
        );

    };
}

export function getProperties(values) {
    console.log(values);
    axios.defaults.withCredentials = true;
    const request = axios
        .post(`${ROOT_URL}/searchproperty`, values);

    return (dispatch) =>
    {
        request.then( (res) => {
                console.log("In get Properties response is : " + JSON.stringify(res));
                dispatch(
                    {
                        type: SEARCH_PROPERTIES,
                        payload: res.data,
                        value : values
                    });
            }
        );

    };
}

export function updateProfile(values) {
    console.log(values);
    axios.defaults.withCredentials = true;
    const request = axios
        .post(`${ROOT_URL}/updateprofile`, values);

    return (dispatch) =>
    {
        request.then( (res) => {
                console.log("In update profile : " + JSON.stringify(res));
                dispatch(
                    {
                        type: UPDATE_PROFILE,
                        payload: res.data,
                        value : values
                    });
            }
        );

    };
}

export function getProfile(values) {
    console.log(values);
    axios.defaults.withCredentials = true;

    const request = axios.get(`${ROOT_URL}/getprofile`, {params: {id: values}});

    return dispatch =>
    {
        console.log("In get profile Dispatch");

        axios.get(`${ROOT_URL}/getprofile`, {params: {id: values}}).then( (res) => {
                console.log("In get profile : " + JSON.stringify(res.data));
                dispatch(
                    {
                        type: GET_PROFILE,
                        payload: res.data,
                        value : values
                    });
            }
        );


    };
}

export function userBookings(values){
    console.log(values);
    axios.defaults.withCredentials = true;
    const request = axios
            .get(`${ROOT_URL}/getuserbookings`, {params: {id: values}});

    return (dispatch) =>
    {
        console.log("In get bookings Dispatch");
        request.then( (res) => {
                console.log("In getuserbookings : " + JSON.stringify(res.data));
                dispatch(
                    {
                        type: USER_BOOKINGS,
                        payload: res.data,
                        value : values
                    });
            }
        );

    };
}

export function ownerBookings(values){
    console.log(values);
    axios.defaults.withCredentials = true;
    const request = axios
        .get(`${ROOT_URL}/getownerbookings`, {params: {id: values}});

    return (dispatch) =>
    {
        request.then( (res) => {
                console.log("In getownerbookings : " + JSON.stringify(res.data));
                dispatch(
                    {
                        type: OWNER_BOOKINGS,
                        payload: res.data,
                        value : values
                    });
            }
        );

    };
}

export function getOwnerProps(values){
    console.log(values);

    axios.defaults.withCredentials = true;
    const request = axios
        .get(`${ROOT_URL}/getownerproperties`, {params: {id: values}});

    return (dispatch) =>
    {
        request.then( (res) => {
                console.log("In getownerproperties : " + JSON.stringify(res.data));
                dispatch(
                    {
                        type: OWNER_PROPERTIES,
                        payload: res.data,
                        value : values
                    });
            }
        );

    };

}



