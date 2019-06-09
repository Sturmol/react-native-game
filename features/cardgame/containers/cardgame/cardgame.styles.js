import { Dimensions } from 'react-native'
const {height, width} = Dimensions.get('window');
export const cardgameStyles = {
	cardTop: {
		position: "absolute",
		top: 10,
		left: 10
	},
	cardBottom: {
		position: "absolute",
		transform: [{rotate: "180deg"}],
		bottom: 10,
		right: 10
	},
	playerTop: {
		position: "absolute",
		padding: 5,
		top: 5,
		right: 10
	},
	playerBottom: {
		position: "absolute",
		padding: 5,
		bottom: 10,
		left: 10
	},
	stack: {},
	player: {},
	buzzerButton: {
		position: "absolute",
		top: height * 0.5,
		left: width * 0.5,
		width: 110,
		height: 110,
		transform: [{translateX: -55},{translateY: -100}],
	},
	buzzerCorrect: {
		position: "absolute",
		top: height * 0.5,
		left: width * 0.5,
		width: 110,
		height: 110,
	},
	buzzerWrong: {
		position: "absolute",
		top: 278,
		right: 10,
		height: 110
	},
	noInteractionTop: {
		width: 95,
		height: 95,
		left: 0
	},
	noInteractionBottom: {
		position: "absolute",
		width: 95,
		height: 95,
		bottom: 0
	},
	noInteractionMid: {
		position: "absolute",
		top: 278,
		width: 112,
		height: 112
	}
};
