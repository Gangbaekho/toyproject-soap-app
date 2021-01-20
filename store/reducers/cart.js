import { ADD_TO_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        const updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice
        );
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
          totalAmount: state.totalAmount + productPrice,
        };
      } else {
        const updatedOrNewCartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          productPrice
        );
        return {
          ...state,
          //  [] 를 이용해서 key를 만들 수 있다 정도?
          //   이것만 새롭게 알면 될 듯.
          items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
          totalAmount: state.totalAmount + productPrice,
        };
      }
  }
  return state;
};
