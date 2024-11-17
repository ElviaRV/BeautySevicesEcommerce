// salonReducers.js
import {
    SALON_LIST_REQUEST,
    SALON_LIST_SUCCESS,
    SALON_LIST_FAIL,
} from '../constants/cartConstants';

export const salonListReducer = (state = { salons: [] }, action) => {
    switch (action.type) {
        case SALON_LIST_REQUEST:
            return {
                ...state, 
                loading: true, 
            };
        case SALON_LIST_SUCCESS:
            return {
                loading: false, 
                salons: action.payload,
            };
        case SALON_LIST_FAIL:
            return {
                loading: false,
                error: action.payload, 
            };
        default:
            return state; 
    }
};
