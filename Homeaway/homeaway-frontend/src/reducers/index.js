import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import UserReducer  from "./reducer_user";
import PropertiesReducer from "./reducer_properties";
import SearchReducer from "./reducer_search";
import UserBookings from "./reducer_userBookings";
import OwnerBookings from "./reducer_ownerBookings";
import OwnerProperties from "./reducer_ownerProperties";



const rootReducer = combineReducers({
    user : UserReducer,
    form : formReducer,
    properties : PropertiesReducer,
    searchData : SearchReducer,
    userBookings : UserBookings,
    ownerBooking : OwnerBookings,
    ownerProperties : OwnerProperties
});

export default rootReducer;
