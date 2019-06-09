import { CARDGAME_INITIAL_STATE } from "./cardgame.state";
import * as CardgameActions from "./cardgame.actions";
import flat from "array.prototype.flat";

const cardgameReducer = (
	currState = CARDGAME_INITIAL_STATE,
	action = undefined
) => {
	switch (action.type) {
		case CardgameActions.CREATE_GAME: {
			return handleNewGame(currState, action);
		}
		case CardgameActions.DRAW_CARD: {
			return drawCard(currState, action);
		}
		case CardgameActions.START_NEXT_ROUND: {
			return startNextRound(currState, action);
		}
		case CardgameActions.TRIGGER_BUZZER: {
			return triggerBuzzer(currState, action);
		}
		default:
			return currState;
	}
};

function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

const handleNewGame = (state, action) => {
	if (!action.players || !action.stack) {
		return state;
	}

	const stack = shuffle(action.stack);

	return {
		...state,
		players: separateStack(action.players, [...stack]),
		stack: [...stack]
	};
};

const drawCard = (state, action) => {
	if (parseInt(action.playerId) !== parseInt(state.activePlayerId)) {
		throw new Error("You shall not pass!");
	}
	const newPlayerHand = [...state.players[action.playerId].hand];
	const drawnCard = newPlayerHand.shift();

	const newPlayersState = { ...state.players };
	newPlayersState[action.playerId] = {
		...state.players[action.playerId],
		hand: newPlayerHand,
		played: [...state.players[action.playerId].played, drawnCard]
	};

	return {
		...state,
		players: newPlayersState
	};
};

const startNextRound = (state, action) => {
	const playersNames = Object.keys(state.players);
	const activePlayerIndex = playersNames.indexOf(state.activePlayerId);

	let nextPlayerId = playersNames[0];

	if (activePlayerIndex >= 0 && activePlayerIndex < playersNames.length - 1) {
		nextPlayerId = playersNames[activePlayerIndex + 1];
	}

	return {
		...state,
		activePlayerId: nextPlayerId
	};
};

const sameType = function(visiblePlayedCards) {
	return visiblePlayedCards.every(
		card => card.type == visiblePlayedCards[0].type
	);
};

const countAmounts = function(visiblePlayedCards) {
	return visiblePlayedCards.map(card => card.amount).reduce((accu, curr) => {
		return accu + curr;
	});
};

const findOneIsFive = function(visiblePlayedCards) {
	return visiblePlayedCards.find(card => card.amount === 5);
};

const flushPlayerHands = function(players) {
	const flushedPlayers = { ...players };
	Object.keys(players).forEach(index => {
		flushedPlayers[index].played = [];
	});

	return flushedPlayers;
};

const movePlayedCardsToWinner = function(
	players,
	triggerByPlayerId,
	playedCards
) {
	const flushedPlayers = flushPlayerHands(players);

	flushedPlayers[triggerByPlayerId].hand = [
		...flushedPlayers[triggerByPlayerId].hand,
		...playedCards
	];

	return flushedPlayers;
};

let moveCardsToWinner = function(state, action, playedCards) {
	const wonPlayerState = movePlayedCardsToWinner(
		state.players,
		action.playerId,
		playedCards
	);

	return {
		...state,
		players: wonPlayerState,
		buzzer: {
			byPlayerId: action.playerId,
			triggered: true
		},
		isAnswerCorrect: true,
		isInteractionAllowed: false,
		roundWonByPlayerId: action.playerId
	};
};
let moveCardsToOtherPlayersWhenLost = function(state, action) {
	const penaltyHand = state.players[action.playerId].hand;
	const otherPlayerCount = Object.keys(state.players).length - 1;
	const startIndex = penaltyHand.length - otherPlayerCount;
	const penaltyCards = penaltyHand.splice(startIndex, otherPlayerCount);

	const newPlayers = Object.keys(state.players)
		.map(playerId => {
			if (action.playerId !== parseInt(playerId)) {
				return state.players[playerId];
			}
		})
		.filter(player => Boolean(player))
		.map(player => {
			if (penaltyCards[0]) {
				player.hand = [...player.hand, penaltyCards[0]];

				delete penaltyCards[0];
				return player;
			}
		});

	newPlayers[action.playerId] = state.players[action.playerId];

	return {
		...state,
		players: { ...newPlayers },
		buzzer: {
			byPlayerId: action.playerId,
			triggered: true
		},
		isAnswerCorrect: false,
		isInteractionAllowed: false,
		roundWonByPlayerId: null
	};
};
const triggerBuzzer = (state, action) => {
	let visiblePlayedCards = [];
	let playedCards = Object.keys(state.players).map(playerId => {
		if (state.players[playerId].played.length) {
			visiblePlayedCards.push(
				state.players[playerId].played[
					state.players[playerId].played.length - 1
				]
			);
		}
		return state.players[playerId].played;
	});

	playedCards = flat(playedCards); // not implemented in IE & Edge (just as hint)(Nils) .. not true its a polyfill! :D(Sven)

	if (
		visiblePlayedCards.length &&
		((sameType(visiblePlayedCards) &&
			countAmounts(visiblePlayedCards) === 5) ||
			(!sameType(visiblePlayedCards) &&
				findOneIsFive(visiblePlayedCards)))
	) {
		const playerHandsWithNoCardsLeft = Object.values(state.players)
			.map(player => player.hand)
			.filter(hand => hand.length === 0);

		if (playerHandsWithNoCardsLeft === state.players.length - 1) {
			state = {
				...state,
				gameWonByPlayerId: action.playerId
			};

			// console.log("Winning: ", action.playerId);
		}
		return moveCardsToWinner(state, action, playedCards);
	}

	return moveCardsToOtherPlayersWhenLost(state, action);
};

const separateStack = (players, stack) => {
	const playerHands = {};
	const stackLength = stack.length;
	const amountOfPlayers = players.length;
	const playerCardCount =
		(stackLength - (stackLength % amountOfPlayers)) / amountOfPlayers;

	// fill for every player the playerHand with cards
	// playerStack should be given to playerHand
	players.forEach((player, index) => {
		playerHands[index] = {
			name: player,
			hand: stack.splice(0, playerCardCount),
			played: []
		};
	});

	return playerHands;
};

export default cardgameReducer;
