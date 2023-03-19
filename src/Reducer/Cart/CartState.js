import { useReducer } from "react";
import CartContext from "./CartContext";
import CartReducer from "./CartReducer";
import { ADD_TO_CART, REMOVE_ITEMS, SHOW_HIDE_CART} from "./Types"

const CartState = ({children}) => {

    const initialState = {
        cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]')
    }

    const [state, dispatch] = useReducer(CartReducer, initialState);

    // console.log(state);

    const addToCart = (item, qty) => {
        // console.log(item._id,item.Name, item.Imageurl, item.new_price, item.quantity ,  qty);
        dispatch( {type: ADD_TO_CART, 
            payload:{ 
                _id : item._id,
                Name: item.Name,
                Imageurl: item.Imageurl,
                new_price: item.new_price,
                quantity: item.quantity,
                qty}
        })
    }

    const removeitem = id => {
        // console.log(id);
        dispatch( {type: REMOVE_ITEMS, payload: id})
    }

    const emptymycartitem = () => {
        dispatch( {type: SHOW_HIDE_CART, payload: []})
    }

    return(
        <CartContext.Provider value={{
            cartItems: state.cartItems,
            addToCart,
            removeitem,
            emptymycartitem
        }}>{children}

        </CartContext.Provider>
    )
}

export default CartState;