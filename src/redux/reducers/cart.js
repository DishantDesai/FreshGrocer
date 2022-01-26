let defaultState = {
    itemsSelected: {
      items: [],
    },
  };
  
  let cartReducer = (state = defaultState, action) => {
    switch (action.type) {
      case "ADD_TO_CART": {
        let newState = { ...state };
        newState.itemsSelected = {
          items: [...newState.itemsSelected.items, action.payload],
        };
  
        return newState;
      }
      case "REMOVE_FROM_CART": {
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
  
  export default cartReducer;
  