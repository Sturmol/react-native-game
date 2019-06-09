import * as React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { LinearGradient } from "expo";

import { appStyles } from "./App.styles";

const styles = StyleSheet.create(appStyles);

export default class AppLayout extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const colors = this.props.colors
			? this.props.colors
			: ["#E9E9EF", "#E9E9EF"];

		return (
			<SafeAreaView style={styles.safeAreaView}>
				<LinearGradient
					colors={colors}
					location={[0.15, 0.1, 1]}
					style={styles.container}
				>
					{this.props.children}
				</LinearGradient>
			</SafeAreaView>
		);
	}
}
