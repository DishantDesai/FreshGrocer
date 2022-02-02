let defaultState = {
  items: [],
};

let productReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS": {
      let newState = { ...state };
      newState.items = action.payload || [];

      return newState;
    }

    default:
      return state;
  }
};

export default productReducer;
