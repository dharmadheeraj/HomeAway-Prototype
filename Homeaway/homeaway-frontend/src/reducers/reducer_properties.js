import {SEARCH_PROPERTIES} from "../actions";

export default function(state, action)
{
    switch(action.type)
    {
        case SEARCH_PROPERTIES:
            return {...state, ...action.payload};
        default:
            return {...state};
    }
}