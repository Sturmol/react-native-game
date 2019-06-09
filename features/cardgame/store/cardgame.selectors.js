import { createSelector } from "reselect";

/**
 * Return whole state object.
 *
 * @param state {Object} - Current store state.
 */
export const getCardgame = state => {
	return state.cardgame;
};

/**
 * Return categories by using `createSelector`.
 *
 * @param {Function} - Selector function which gets the whole slice of the state object.
 * @param {Function} - Returns categories state by using a simple arrow function.
 */
export const getContentPlayers = createSelector(
	getCardgame,
	state => state.players
);

export const getActivePlayerId = createSelector(getCardgame, state => {
	return state.activePlayerId;
});

export const getIsAnswerCorrect = createSelector(
	getCardgame,
	state => state.isAnswerCorrect
);
