import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

// STYLES
import { ResultscreenStyles } from "./resultscreen.styles";

// COMPONENTS
import Layout from "../../../../App.layout";

const styles = StyleSheet.create(ResultscreenStyles);

export default class Resultscreen extends Component {
	state = {};

	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		return (
			<Layout>
				<View style={styles.resultscreenContainer}>
					<Text>Won!!</Text>
				</View>
			</Layout>
		);
	}
}
