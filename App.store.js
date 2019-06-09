import { createStore, applyMiddleware, combineReducers } from "redux";
import devToolsEnhancer from "remote-redux-devtools"; // http://remotedev.io/local/

/**
 * Store slices
 */
import * as cardgameStore from "./features/cardgame/store/index";

const ROOT_INITAL_STATE = {
	cardgame: cardgameStore.CARDGAME_INITIAL_STATE
};

const ROOT_REDUCER = combineReducers({
	cardgame: cardgameStore.cardgameReducer
});

const appStore = createStore(
	ROOT_REDUCER,
	ROOT_INITAL_STATE,
	devToolsEnhancer()
);

export default appStore;
