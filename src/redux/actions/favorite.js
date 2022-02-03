export const addToFavorite = (item) => {
  return {
    type: "ADD_FAVORITE",
    payload: item,
  };
};

export const removeFromFavorite = (item) => {
  return {
    type: "REMOVE_FAVORITE",
    payload: item,
  };
};

export const clearCart = () => {
  return {
    type: "CLEAR_CART",
  };
};
