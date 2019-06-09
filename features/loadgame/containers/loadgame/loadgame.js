import React, {Component} from "react";
import {StyleSheet, View, Text} from "react-native";

// STYLES
import {LoadgameStyles} from "./loadgame.styles";

// COMPONENTS
import Layout from "../../../../App.layout";

const styles = StyleSheet.create(LoadgameStyles);

export default class Loadgame extends Component {
	state = {
		counter: 3
	};

	constructor(props) {
		super(props);
	}

	componentWillMount() {
	}

	componentDidMount() {
		this.counterInterval = setInterval(() => {
			if (this.state.counter > 0) {
				this.setState(prevState => {
					return {counter: prevState.counter - 1};
				});
			} else {
				clearInterval(this.counterInterval);
				this.props.navigation.navigate("Cardgame");
			}
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.counterInterval);
	}

	render() {
		return (
			<Layout>
				<View style={styles.loadgameContainer}>
					<Text style={styles.message}>Cards are shuffled</Text>
					{this.state.counter && (
						<Text style={styles.text}>{this.state.counter}</Text>
					)}
				</View>
			</Layout>
		);
	}
}
