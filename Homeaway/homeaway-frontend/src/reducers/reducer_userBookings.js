import {USER_BOOKINGS} from "../actions";

export default function(state, action)
{
    switch(action.type)
    {
        case USER_BOOKINGS:
            return  action.payload;
        default:
            return {...state};
    }
}