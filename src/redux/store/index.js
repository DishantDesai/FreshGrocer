import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authReducer from "../reducers/auth";
import productReducer from "../reducers/products";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"],
};
const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  products: productReducer,
});

export const store = createStore(rootReducer);
export const persistor = persistStore(store);
