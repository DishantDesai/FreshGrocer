let defaultState = {
  itemsSelected: {
    items: [],
  },
};

let favoriteReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_FAVORITE": {
      let newState = { ...state };
      newState.itemsSelected = {
        items: [...newState.itemsSelected.items, action.payload],
      };

      return newState;
    }
    case "REMOVE_FAVORITE": {
      let newState = { ...state };

      const filterItems = newState.itemsSelected.items.filter(
        (item) => item.id !== action.payload.id
      );

      newState.itemsSelected = {
        items: filterItems,
      };

      return newState;
    }

    case "CLEAR_CART": {
      let newState = { ...state };
      newState.itemsSelected = {
        items: [],
      };

      return newState;
    }

    default:
      return state;
  }
};

export default favoriteReducer;
