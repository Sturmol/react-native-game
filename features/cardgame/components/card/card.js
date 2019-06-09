import React from "react";
import {View, Animated, StyleSheet, Image, ImageBackground} from "react-native";

// STYLES
import {cardStyles} from "./card.styles";

// COMPONENTS
import FlipCard from "react-native-flip-card";

const styles = StyleSheet.create(cardStyles);

export default class Card extends React.Component {
	state = {
		cardItem: this.props.cardItem,
		isCardFaceUp: this.props.isCardFaceUp
	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// console.log('card.js:componentDidMount!!', this.props);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.isCardFaceUp) {
			this.setState(() => ({
				isCardFaceUp: nextProps.isCardFaceUp
			}));
		}

		if (nextProps.cardItem) {
			this.setState(() => ({
				cardItem: nextProps.cardItem
			}));
		}
	}

	onFlipStart(isFacedown) {
		// console.log("onFlipStart: isFacedown", isFacedown);
	}

	onFlipEnd(isFacedown) {
		// console.log("onFlipEnd: isFacedown", isFacedown);
	}

	cardLayoutOne(fruit) {
		return (
			<ImageBackground
				style={styles.cardContentLayout}
				source={require("../../../../assets/card-backface.png")}
			>
				<Image style={styles.cardContentFruitEmptyRow}/>
				<Image
					source={fruit}
					style={styles.cardContentFruitSingleMiddle}
				/>
				<Image style={styles.cardContentFruitEmptyRow}/>
			</ImageBackground>
		);
	}

	cardLayoutTwo(fruit) {
		return (
			<ImageBackground
				style={styles.cardContentLayout}
				source={require("../../../../assets/card-backface.png")}
			>
				<Image
					source={fruit}
					style={styles.cardContentFruitSingleTopLeft}
				/>
				<Image style={styles.cardContentFruitEmptyRow}/>
				<View style={styles.cardContentFruitWrapper}>
					<Image style={styles.cardContentFruitEmptyRow}/>
					<Image
						source={fruit}
						style={styles.cardContentFruitSingleBottomRight}
					/>
				</View>
			</ImageBackground>
		);
	}

	cardLayoutThree(fruit) {
		return (
			<ImageBackground
				style={styles.cardContentLayout}
				source={require("../../../../assets/card-backface.png")}
			>
				<Image
					source={fruit}
					style={styles.cardContentFruitSingleTopLeft}
				/>
				<Image
					source={fruit}
					style={styles.cardContentFruitSingleMiddle}
				/>
				<View style={styles.cardContentFruitWrapper}>
					<Image style={styles.cardContentFruitEmptyRow}/>
					<Image
						source={fruit}
						style={styles.cardContentFruitSingleBottomRight}
					/>
				</View>
			</ImageBackground>
		);
	}

	cardLayoutFour(fruit) {
		return (
			<ImageBackground
				style={styles.cardContentLayout}
				source={require("../../../../assets/card-backface.png")}
			>
				<View style={styles.cardContentFruitWrapper}>
					<Image
						source={fruit}
						style={styles.cardContentFruitSingleTopLeft}
					/>
					<Image
						source={fruit}
						style={styles.cardContentFruitSingleBottomLeft}
					/>
				</View>
				<Image style={styles.cardContentFruitEmptyRow}/>
				<View style={styles.cardContentFruitWrapper}>
					<Image
						source={fruit}
						style={styles.cardContentFruitSingleTopRight}
					/>
					<Image
						source={fruit}
						style={styles.cardContentFruitSingleBottomRight}
					/>
				</View>
			</ImageBackground>
		);
	}

	cardLayoutFive(fruit) {
		return (
			<ImageBackground
				style={styles.cardContentLayout}
				source={require("../../../../assets/card-backface.png")}
			>
				<View style={styles.cardContentFruitWrapper}>
					<Image
						source={fruit}
						style={styles.cardContentFruitSingleTopLeft}
					/>
					<Image
						source={fruit}
						style={styles.cardContentFruitSingleBottomLeft}
					/>
				</View>
				<Image
					source={fruit}
					style={styles.cardContentFruitSingleMiddle}
				/>
				<View style={styles.cardContentFruitWrapper}>
					<Image
						source={fruit}
						style={styles.cardContentFruitSingleTopRight}
					/>
					<Image
						source={fruit}
						style={styles.cardContentFruitSingleBottomRight}
					/>
				</View>
			</ImageBackground>
		);
	}

	renderFruitsCard(cardItem) {
		const fruit = cardItem.fruit;

		switch (cardItem.amount) {
			case 1: {
				return this.cardLayoutOne(fruit);
			}
			case 2: {
				return this.cardLayoutTwo(fruit);
			}
			case 3: {
				return this.cardLayoutThree(fruit);
			}
			case 4: {
				return this.cardLayoutFour(fruit);
			}
			case 5: {
				return this.cardLayoutFive(fruit);
			}
			default: {
				return (
					<Image source={fruit} style={styles.cardContentLayout}/>
				);
			}
		}
	}

	render() {
		// console.log('card.js:render: ', this.state.isCardFaceUp);

		return (
			<View style={styles.cardContainer}>
				<FlipCard
					style={styles.card}
					friction={15}
					perspective={1000}
					flipHorizontal={false}
					flipVertical={true}
					flip={!this.state.isCardFaceUp}
					clickable={false}
					onFlipStart={isFacedown => this.onFlipStart(isFacedown)}
					onFlipEnd={isFacedown => this.onFlipEnd(isFacedown)}
				>
					<View style={styles.faceUp}>
						{this.state.cardItem.fruit &&
						this.state.cardItem.amount &&
						this.renderFruitsCard(this.state.cardItem)}
					</View>
					<View style={styles.facedown}>
						<Animated.Image
							style={styles.facedown}
							source={require("../../../../assets/card-backface.png")}
						/>
					</View>
				</FlipCard>
			</View>
		);
	}
}
