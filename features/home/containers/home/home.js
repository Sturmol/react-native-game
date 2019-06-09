import React, { Component } from "react";
import { Image, StyleSheet, View, TouchableOpacity, Text } from "react-native";

// STYLES
import { HomeStyles } from "./home.styles";

// COMPONENTS
import Layout from "../../../../App.layout";
import Loadgame from "../../../loadgame/containers/loadgame/loadgame";

const styles = StyleSheet.create(HomeStyles);

export default class Home extends Component {
	constructor(props) {
		super(props);
	}

	handlePress() {
		this.props.navigation.navigate("Loadgame");
	}

	render() {
		return (
			<Layout>
				<Image
					style={styles.image}
					source={require("../../../../assets/splash.png")}
				/>
				<View style={styles.buttonWrapper}>
					<TouchableOpacity
						onPress={() => this.handlePress()}
						style={styles.button}
					>
						<Text style={styles.buttonText}>START</Text>
					</TouchableOpacity>
				</View>
			</Layout>
		);
	}
}
