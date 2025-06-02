import { combineReducers } from "redux";
import loadingReducer from "./loadingReducer";

export const allReducers = combineReducers({
  loadingReducer,
});
