import React from "react";
import { View, Animated, StyleSheet } from "react-native";

import { stackStyles } from "./stack.styles";

const styles = StyleSheet.create(stackStyles);

export default class Stack extends React.Component {
	state = {
		amount: this.props.amount
	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// console.log('stack.js:componentDidMount!!', this.props);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.amount) {
			this.setState(() => ({
				amount: nextProps.amount
			}));
		}
	}

	render() {
		// console.log("this.state.amount: ", this.state.amount);

		return (
			<View style={styles.stackContainer}>
				{this.state.amount === 1 && (
					<View style={styles.stack1}>
						<Animated.Image
							style={styles.image}
							source={require("../../../../assets/card-backface.png")}
						/>
					</View>
				)}

				{this.state.amount > 1 && (
					<View style={styles.stack2}>
						<Animated.Image
							style={styles.image}
							source={require("../../../../assets/card-backface.png")}
						/>
					</View>
				)}

				{this.state.amount > 2 && (
					<View style={styles.stack3}>
						<Animated.Image
							style={styles.image}
							source={require("../../../../assets/card-backface.png")}
						/>
					</View>
				)}

				{this.state.amount > 3 && (
					<View style={styles.stack4}>
						<Animated.Image
							style={styles.image}
							source={require("../../../../assets/card-backface.png")}
						/>
					</View>
				)}
			</View>
		);
	}
}
