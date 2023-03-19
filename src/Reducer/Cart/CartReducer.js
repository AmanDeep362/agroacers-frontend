import { ADD_TO_CART, REMOVE_ITEMS, SHOW_HIDE_CART } from "./Types";

const CartReducer = (state, action) => {

    switch (action.type) {

        case ADD_TO_CART:
            {
                const item = action.payload;
                const product = state.cartItems.find(x => x._id === item._id);
                if (product) {
                    return { cartItems: state.cartItems.map(x => x._id === product._id ? item : x) };
                }
                return { cartItems: [...state.cartItems, item] }
            }
        case REMOVE_ITEMS:
            {
                return { cartItems: state.cartItems.filter(x => x._id !== action.payload) }
            }
        case SHOW_HIDE_CART:
            {
                return { cartItems: [] }
            }
        default:
            return state;
    }
}

export default CartReducer;