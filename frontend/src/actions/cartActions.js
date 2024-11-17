import axios from 'axios'
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
	CART_SAVE_APPOINTMENT_DETAILS,
	SALON_LIST_REQUEST,
	SALON_LIST_SUCCESS,
	SALON_LIST_FAIL,
} from '../constants/cartConstants'

// Actions to add a single product to the cart
export const addToCart = (id, qty) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/products/${id}`)
	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product: data._id,
			name: data.name,
			image: data.image,
			price: data.price,
			countInStock: data.countInStock,
			qty,
		},
	})
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// Actions to remove a single product from the cart
export const removeFromCart = (id) => (dispatch, getState) => {
	dispatch({
		type: CART_REMOVE_ITEM,
		payload: id,
	})
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// Actions to save shipping address


// Actions to save payment method
export const savePaymentMethod = (data) => (dispatch) => {
	dispatch({
		type: CART_SAVE_PAYMENT_METHOD,
		payload: data,
	})
}

// Actions to save appointment details
export const saveAppointmentDetails = (data) => (dispatch) => {
	dispatch({
		type: CART_SAVE_APPOINTMENT_DETAILS,
		payload: data,
	})
	localStorage.setItem('appointmentDetails', JSON.stringify(data))
}

export const getSalons = () => async (dispatch, getState) => {
    try {
        dispatch({ type: SALON_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get('/api/orders/salons', config);
		console.log(data)
        dispatch({
            type: SALON_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: SALON_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};