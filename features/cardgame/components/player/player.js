import React from "react";
import { View, Animated, StyleSheet, Text } from "react-native";

// STYLES
import { playerStyles } from "./player.styles";

// COMPONENTS
import AnimateNumber from "react-native-countup";
// https://www.npmjs.com/package/react-native-countup

const styles = StyleSheet.create(playerStyles);

let playerCounterOld = 0;
let playerCounterNew = 0;

export default class Player extends React.Component {
	state = {
		playerName: this.props.playerName,
		amountCards: this.props.amountCards
	};

	playerCounterOld = this.props.amountCards;
	playerCounterNew = this.props.amountCards;

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// console.log('player.js:componentDidMount!!', this.props);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.playerName) {
			this.setState(() => ({
				playerName: nextProps.playerName
			}));
		}

		if (typeof nextProps.amountCards === "number") {
			this.playerCounterOld = this.playerCounterNew;
			this.playerCounterNew = nextProps.amountCards;

			this.setState(() => ({
				amountCards: this.playerCounterNew
			}));
		}
	}

	formatNumber(val) {
		// console.log('player.js: formatNumber: ', val);
		return val;
	}

	onProgress(val) {
		// console.log('player.js: onProgress: ', val);
	}

	onFinish(val) {
		// console.log('player.js: onFinish: ', val);
	}

	render() {
		// console.log('player.js: render: ', this.state);

		return (
			<View style={styles.playerContainer}>
				<Text style={styles.playerName}>
					{this.state.playerName}
					<Text style={styles.playerName}>
						<Text style={styles.textCards}> Cards: </Text>
						<Text style={styles.amountCards}>
							<AnimateNumber
								initial={this.playerCounterOld}
								value={this.playerCounterNew}
								countBy={1}
								timing="easeIn"
								interval={25}
								formatter={val => this.formatNumber(val)}
								onProgress={val => this.onProgress(val)}
								onFinish={val => this.onFinish(val)}
							/>
						</Text>
					</Text>
				</Text>
			</View>
		);
	}
}
