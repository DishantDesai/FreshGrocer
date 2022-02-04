import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authReducer from "../reducers/auth";
import cartReducer from "../reducers/cart";
import productReducer from "../reducers/products";
import favoriteReducer from "../reducers/favorite";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "favorite"],
};
const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  cart: cartReducer,
  products: productReducer,
  favorite: persistReducer(persistConfig, favoriteReducer),
});

export const store = createStore(rootReducer);
export const persistor = persistStore(store);
