import { combineReducers, createStore } from "redux";
import userReducer from "./userRedicer";

const rootRedocer = combineReducers({
	user: userReducer
})


export const store = createStore(rootRedocer)