import React from "react";
import { View, Animated, StyleSheet } from "react-native";

import { noInteractionStyles } from "./no-interaction.styles";

const styles = StyleSheet.create(noInteractionStyles);

export default function NoInteraction() {
	return (
		<View style={styles.noInteractionContainer}>
			<Animated.Image
				style={styles.image}
				source={require("../../../../assets/no-interaction.png")}
			/>
		</View>
	);
}
