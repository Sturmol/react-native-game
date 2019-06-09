import cardgameReducer from "./cardgame.reducer";
import {
	createGame,
	drawCard,
	startNextRound,
	triggerBuzzer
} from "./cardgame.actions";
import {CARDGAME_INITIAL_STATE} from "./cardgame.state";

describe("cardgame reducer", () => {
	const mockCards = [
		{fruit: "🍏", amount: 1, type: "apple"},
		{fruit: "🍏", amount: 2, type: "apple"},
		{fruit: "🍏", amount: 3, type: "apple"},
		{fruit: "🍏", amount: 4, type: "apple"},
		{fruit: "🍏", amount: 5, type: "apple"}
	];

	const mockState = {
		stack: mockCards,
		activePlayerId: undefined,
		players: {
			0: {
				name: "player1",
				hand: [
					{fruit: "🍏", amount: 1, type: "apple"},
					{fruit: "🍏", amount: 2, type: "apple"}
				],
				played: []
			},
			1: {
				name: "cpu",
				hand: [
					{fruit: "🍏", amount: 3, type: "apple"},
					{fruit: "🍏", amount: 4, type: "apple"}
				],
				played: []
			}
		},
		buzzer: {
			triggered: false,
			byPlayerId: undefined
		},
		roundWonByPlayerId: undefined
	};

	it("should create a new game", () => {
		expect(
			cardgameReducer(
				CARDGAME_INITIAL_STATE,
				createGame(["cpu", "player1"], mockCards)
			)
		).toEqual({
			stack: mockCards,
			activePlayerId: undefined,
			players: {
				0: {
					name: "cpu",
					hand: [
						{fruit: "🍏", amount: 1, type: "apple"},
						{fruit: "🍏", amount: 2, type: "apple"}
					],
					played: []
				},
				1: {
					name: "player1",
					hand: [
						{fruit: "🍏", amount: 3, type: "apple"},
						{fruit: "🍏", amount: 4, type: "apple"}
					],
					played: []
				}
			},
			buzzer: {
				triggered: false,
				byPlayerId: undefined
			},
			roundWonByPlayerId: undefined
		});
	});

	it("should return initial state", () => {
		expect(cardgameReducer(undefined, {})).toEqual({
			stack: [],
			players: {},
			buzzer: {
				triggered: false,
				byPlayerId: undefined
			},
			roundWonByPlayerId: undefined
		});
	});

	it("should draw a card", () => {
		const newState = cardgameReducer(mockState, drawCard(1));
		expect(newState).toEqual({
			...mockState,
			players: {
				0: {
					name: "player1",
					hand: [
						{fruit: "🍏", amount: 1, type: "apple"},
						{fruit: "🍏", amount: 2, type: "apple"}
					],
					played: []
				},
				1: {
					name: "cpu",
					hand: [
						{fruit: "🍏", amount: 4, type: "apple"}
					],
					played: [
						{fruit: "🍏", amount: 3, type: "apple"}
					]
				}
			}
		});
	});

	it("should start the first round", () => {
		const newState = cardgameReducer(mockState, startNextRound());
		expect(newState).toEqual({
			...mockState,
			activePlayerId: "0"
		});
	});

	it("should start the second round", () => {
		const newState = cardgameReducer(
			{
				...mockState,
				activePlayerId: "0"
			},
			startNextRound()
		);
		expect(newState).toEqual({
			...mockState,
			activePlayerId: "1"
		});
	});

	it("should move cards to winner and set buzzer to active (same type)", () => {
		const newState = cardgameReducer(
			{
				...mockState,
				players: {
					0: {
						name: "player1",
						hand: [
							{fruit: "🍏", amount: 1, type: "apple"},
							{fruit: "🍏", amount: 2, type: "apple"}
						],
						played: [
							{fruit: "🍌", amount: 2, type: "banana"}
						]
					},
					1: {
						name: "cpu",
						hand: [
							{fruit: "🍏", amount: 3, type: "apple"},
							{fruit: "🍏", amount: 4, type: "apple"}
						],
						played: [
							{fruit: "🍌", amount: 3, type: "banana"}
						]
					}
				}
			},
			triggerBuzzer(1)
		);
		expect(newState).toEqual({
			...mockState,
			players: {
				0: {
					name: "player1",
					hand: [
						{fruit: "🍏", amount: 1, type: "apple"},
						{fruit: "🍏", amount: 2, type: "apple"}
					],
					played: []
				},
				1: {
					name: "cpu",
					hand: [
						{fruit: "🍏", amount: 3, type: "apple"},
						{fruit: "🍏", amount: 4, type: "apple"},
						{fruit: "🍌", amount: 2, type: "banana"},
						{fruit: "🍌", amount: 3, type: "banana"}
					],
					played: []
				}
			},
			buzzer: {
				triggered: true,
				byPlayerId: 1
			},
			isAnswerCorrect: true,
			isInteractionAllowed: false,
			roundWonByPlayerId: 1
		});
	});

	it("should move cards to winner and set buzzer to active (not same type, 1 card is 5)", () => {
		const newState = cardgameReducer(
			{
				...mockState,
				players: {
					0: {
						name: "player1",
						hand: [
							{fruit: "🍏", amount: 1, type: "apple"},
							{fruit: "🍏", amount: 2, type: "apple"}
						],
						played: [
							{fruit: "🍋", amount: 5, type: "lemon"}
						]
					},
					1: {
						name: "cpu",
						hand: [
							{fruit: "🍏", amount: 3, type: "apple"},
							{fruit: "🍏", amount: 4, type: "apple"}
						],
						played: [
							{fruit: "🍌", amount: 1, type: "banana"}
						]
					}
				}
			},
			triggerBuzzer(1)
		);
		expect(newState).toEqual({
			...mockState,
			players: {
				0: {
					name: "player1",
					hand: [
						{fruit: "🍏", amount: 1, type: "apple"},
						{fruit: "🍏", amount: 2, type: "apple"}
					],
					played: []
				},
				1: {
					name: "cpu",
					hand: [
						{fruit: "🍏", amount: 3, type: "apple"},
						{fruit: "🍏", amount: 4, type: "apple"},
						{fruit: "🍋", amount: 5, type: "lemon"},
						{fruit: "🍌", amount: 1, type: "banana"}
					],
					played: []
				}
			},
			buzzer: {
				triggered: true,
				byPlayerId: 1
			},
			isAnswerCorrect: true,
			isInteractionAllowed: false,
			roundWonByPlayerId: 1
		});
	});

	it("should flush hands on false trigger (4 bananas only)", () => {
		const newState = cardgameReducer(
			{
				...mockState,
				players: {
					0: {
						name: "player1",
						hand: [
							{fruit: "🍏", amount: 1, type: "apple"},
							{fruit: "🍏", amount: 2, type: "apple"}
						],
						played: [{
							fruit: "🍌", amount: 2, type: "banana"
						}
						]
					},
					1: {
						name: "cpu",
						hand: [
							{fruit: "🍏", amount: 3, type: "apple"},
							{fruit: "🍏", amount: 4, type: "apple"}
						],
						played: [
							{fruit: "🍌", amount: 2, type: "banana"}
						]
					}
				}
			},
			triggerBuzzer(1)
		);
		expect(newState).toEqual({
			...mockState,
			players: {
				0: {
					name: "player1",
					hand: [
						{fruit: "🍏", amount: 1, type: "apple"},
						{fruit: "🍏", amount: 2, type: "apple"},
						{fruit: "🍏", amount: 4, type: "apple"}
					],
					played: [{fruit: "🍌", amount: 2, type: "banana"}]
				},
				1: {
					name: "cpu",
					hand: [
						{fruit: "🍏", amount: 3, type: "apple"}
					],
					played: [
						{fruit: "🍌", amount: 2, type: "banana"}
					]
				}
			},
			buzzer: {
				triggered: true,
				byPlayerId: 1
			},
			isAnswerCorrect: false,
			isInteractionAllowed: false,
			roundWonByPlayerId: null
		});
	});

	it("should flush hands on false trigger (4 bananas only) when no card is left", () => {
		const newState = cardgameReducer(
			{
				...mockState,
				players: {
					0: {
						name: "player1",
						hand: [
							{fruit: "🍏", amount: 1, type: "apple"},
							{fruit: "🍏", amount: 2, type: "apple"}
						],
						played: [
							{fruit: "🍌", amount: 2, type: "banana"}
						]
					},
					1: {
						name: "cpu",
						hand: [],
						played: [
							{fruit: "🍌", amount: 2, type: "banana"}
						]
					}
				}
			},
			triggerBuzzer(1)
		);
		expect(newState).toEqual({
			...mockState,
			players: {
				0: {
					name: "player1",
					hand: [
						{fruit: "🍏", amount: 1, type: "apple"},
						{fruit: "🍏", amount: 2, type: "apple"}
					],
					played: [
						{fruit: "🍌", amount: 2, type: "banana"}
					]
				},
				1: {
					name: "cpu",
					hand: [],
					played: [
						{fruit: "🍌", amount: 2, type: "banana"}
					]
				}
			},
			buzzer: {
				triggered: true,
				byPlayerId: 1
			},
			isAnswerCorrect: false,
			isInteractionAllowed: false,
			roundWonByPlayerId: null
		});
	});
});
