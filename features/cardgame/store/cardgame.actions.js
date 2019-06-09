// Read and load actions
export const CREATE_GAME = "@@cardgame--halli-galli/card-game/new-game";
export const DRAW_CARD = "@@cardgame--halli-galli/card-game/draw-card";
export const TRIGGER_BUZZER =
	"@@cardgame--halli-galli/card-game/trigger-buzzer";
export const START_NEXT_ROUND =
	"@@cardgame--halli-galli/card-game/start-next-round";
// export const WON_ROUND = "@@cardgame--halli-galli/card-game/won-round";
// export const LOST_ROUND = "@@cardgame--halli-galli/card-game/lost-round";
export const RESET = "@@cardgame--halli-galli/card-game/reset";

export const createGame = (players, stack) => {
	return {
		type: CREATE_GAME,
		players: players,
		stack: stack
	};
};

export const drawCard = playerId => {
	return {
		type: DRAW_CARD,
		playerId: playerId
	};
};

export const triggerBuzzer = playerId => {
	return {
		type: TRIGGER_BUZZER,
		playerId: playerId
	};
};

export const startNextRound = () => {
	return {
		type: START_NEXT_ROUND
	};
};

// export const wonRound = players => {
//   return {
//     type: WON_ROUND,
//     payload: {
//       players: players
//     }
//   };
// };
//
// export const lostRound = players => {
//   return {
//     type: LOST_ROUND,
//     payload: {
//       players: players
//     }
//   };
// };

export const reset = players => {
	return {
		type: RESET,
		payload: {
			players: players
		}
	};
};
