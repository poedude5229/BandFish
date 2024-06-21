const ADD = "cart/ADD";
export function addToCart(itemId) {
  return {
    type: ADD,
    payload: itemId,
  };
}

const DELETE = "cart/DELETE";
export function removeFromCart(itemId) {
  return {
    type: DELETE,
    payload: itemId,
  };
}

const SETCARTSTATE = "cart/SETCARTSTATE";
export function setCartState(cartState) {
  return {
    type: SETCARTSTATE,
    payload: cartState,
  };
}

const CLEARCART = "cart/CLEARCART";
export function clearCartState() {
  return {
    type: CLEARCART,
  };
}

export const addToCartThunk = (id) => async (dispatch) => {
  await dispatch(addToCart(id));
};

export const removeFromCartThunk = (id) => async (dispatch) => {
  await dispatch(removeFromCart(id));
};

export const clearCartThunk = () => async (dispatch) => {
  await dispatch(clearCartState());
};

export function cartReducer(state = {}, action) {
  switch (action.type) {
    case ADD: {
      const itemId = action.payload;
      return { ...state, [itemId]: { id: itemId } };
    }
    case DELETE: {
      let newState = { ...state };
      delete newState[action.payload];
      return newState;
    }
    case SETCARTSTATE: {
      return action.payload;
    }
    case CLEARCART: {
      return {};
    }
    default:
      return state;
  }
}
