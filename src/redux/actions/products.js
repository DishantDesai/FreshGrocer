export const getAllProducts = (items) => {
  //   console.log("items", items);
  return {
    type: "GET_PRODUCTS",
    payload: items,
  };
};
