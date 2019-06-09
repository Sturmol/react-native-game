import { Dimensions } from 'react-native'
const {height, width} = Dimensions.get('window');
export const cardStyles = {
	cardContainer: {
		position: "absolute",
		top: 60,
		left: width * 0.5,
		transform: [{translateX: -90}],
		zIndex: 9,
	},
	card: {
		borderWidth: 0
	},
	faceUp: {
		borderRadius: 11,
		shadowColor: "rgba(0,0,0,0.5)",
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.5,
		margin: 0,
		padding: 0
	},
	cardContentLayout: {
		width: 120,
		height: 180,
		flexDirection: "row",
		justifyContent: "space-between"
	},
	cardContentFruitWrapper: {
		justifyContent: "space-between"
	},
	cardContentFruitEmptyRow: {
		width: 27,
		height: 32,
	},
	cardContentFruitSingleMiddle: {
		width: 27,
		height: 32,
		marginTop: 75,
	},
	cardContentFruitSingleTopLeft: {
		width: 27,
		height: 32,
		marginLeft: 10,
		marginTop: 10,
	},
	cardContentFruitSingleTopRight: {
		width: 27,
		height: 32,
		marginRight: 10,
		marginTop: 10,
	},
	cardContentFruitSingleBottomLeft: {
		width: 27,
		height: 32,
		marginLeft: 10,
		marginBottom: 10,
	},
	cardContentFruitSingleBottomRight: {
		width: 27,
		height: 32,
		marginRight: 10,
		marginBottom: 10,
	}
};
