export const addToCart = (item) => {
  return {
    type: "ADD_TO_CART",
    payload: item,
  };
};

export const removeFromCart = (item) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: item,
  };
};

export const clearCart = () => {
  return {
    type: "CLEAR_CART",
  };
};

export const increaseQuantity = (id) => {
  return {
    type: "INCREASE_QUANTITY",
    payload: id,
  };
};

export const decreaseQuantity = (id) => {
  console.log("id", id);
  return {
    type: "DECREASE_QUANTITY",
    payload: id,
  };
};
