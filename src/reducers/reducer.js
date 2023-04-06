import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
} from '../actions/actions';

const reducer = (state, action) => {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: new Map() };
  }
  if (action.type === REMOVE) {
    const newCart = new Map(state.cart);
    newCart.delete(action.payload.id);
    return { ...state, cart: newCart };
  }
  if (action.type === INCREASE) {
    const newCart = new Map(state.cart);
    const product = newCart.get(action.payload.id);
    const newItemTotal = { ...product, amount: product.amount + 1 };
    newCart.set(action.payload.id, newItemTotal);
    return { ...state, cart: newCart };
  }
  if (action.type === DECREASE) {
    const newCart = new Map(state.cart);
    const product = newCart.get(action.payload.id);
    const newItemTotal = { ...product, amount: product.amount - 1 };
    newCart.set(action.payload.id, newItemTotal);
    return { ...state, cart: newCart };
  }
  throw new Error(`No matching action type: ${action.type}`);
};

export default reducer;
