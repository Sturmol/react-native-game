import React from "react";
import { View, Animated, StyleSheet } from "react-native";

import { buzzerStyles } from "./buzzer.styles";

const styles = StyleSheet.create(buzzerStyles);

export function BuzzerButton() {
	return (
		<View style={styles.buzzerContainer}>
			<Animated.Image
				style={styles.image}
				source={require("../../../../assets/buzzer_button.png")}
			/>
		</View>
	);
}

export function BuzzerCorrect() {
	return (
		<View style={styles.buzzerContainer}>
			<Animated.Image
				style={styles.image}
				source={require("../../../../assets/buzzer_correct.png")}
			/>
		</View>
	);
}

export function BuzzerWrong() {
	return (
		<View style={styles.buzzerContainer}>
			<Animated.Image
				style={styles.image}
				source={require("../../../../assets/buzzer_wrong.png")}
			/>
		</View>
	);
}

export default [
	{
		BuzzerButton,
		BuzzerCorrect,
		BuzzerWrong
	}
];
