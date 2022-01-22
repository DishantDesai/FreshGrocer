import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authReducer from "../reducers/auth";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"],
};
const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
});

export const store = createStore(rootReducer);
export const persistor = persistStore(store);
