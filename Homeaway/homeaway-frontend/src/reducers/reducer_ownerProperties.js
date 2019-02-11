import {OWNER_PROPERTIES} from "../actions";

export default function(state, action)
{
    switch(action.type)
    {
        case OWNER_PROPERTIES:
            return action.payload;
        default:
            return {...state};
    }
}