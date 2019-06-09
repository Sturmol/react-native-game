export const CARDGAME_INITIAL_STATE = {
	stack: [],
	activePlayerId: 1,
	players: {
		// player1: {
		//	 name: "",
		//   hand: [],
		//   played: []
		// }
	},
	buzzer: {
		triggered: false,
		byPlayerId: undefined
	},
	roundWonByPlayerId: undefined,
	gameWonByPlayerId: undefined
};
