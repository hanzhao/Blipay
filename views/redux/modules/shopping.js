const ADD_ITEM_TO_CART = 'Blipay/shopping/ADD_ITEM_TO_CART'

export const addItemToCart = (id) => ({
	type: ADD_ITEM_TO_CART,
	id
})

const initialState = {
	cartItems: []
}

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case ADD_ITEM_TO_CART:
			return {
				...state,
				cartItems: [...state.cartItems, action.id]
			}
		default:
			return state;
	}
}