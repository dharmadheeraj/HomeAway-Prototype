import {OWNER_BOOKINGS} from "../actions";

export default function(state, action)
{
    switch(action.type)
    {
        case OWNER_BOOKINGS:
            return action.payload;
        default:
            return {...state};
    }
}