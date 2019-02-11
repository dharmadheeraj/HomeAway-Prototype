import {GET_PROFILE, GET_PROFILE_PIC, SUBMIT_LOGIN, UPDATE_PROFILE} from "../actions";

export default function(state, action)
{

    switch(action.type)
    {
        case SUBMIT_LOGIN:
            return action.payload;
        case UPDATE_PROFILE:
            return {...state};
        case GET_PROFILE:
            return action.payload;
        case GET_PROFILE_PIC:
            return action.payload;
        default:
            return {...state};
    }
}