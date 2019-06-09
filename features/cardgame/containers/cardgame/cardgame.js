import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, TouchableOpacity } from "react-native";

// STORE
import appStore from "../../../../App.store";
import { cardgameActions, cardgameFromContent } from "../../store/index";

// STYLES
import { cardgameStyles } from "./cardgame.styles";

// GAME SETTINGS
import { HALLI_GALLI_SETTINGS_DEFAULT as gameSettings } from "../../../game-settings/settings-halli-galli";

// COMPONENTS
import Layout from "../../../../App.layout";
import {
	BuzzerButton,
	BuzzerCorrect,
	BuzzerWrong
} from "../../components/buzzer/buzzer";
import Card from "../../components/card/card";
import Stack from "../../components/stack/stack";
import Player from "../../components/player/player";
import NoInteraction from "../../components/no-interaction/no-interaction";

const styles = StyleSheet.create(cardgameStyles);

const amountPlayers = gameSettings.amountOfPlayers || 0;
const playerNames = gameSettings.playerNames || [];
const cardSet = gameSettings.cardSet || [];

const isCardFaceUp = true;

export class Cardgame extends Component {
	state = {
		activePlayerId: 1,
		isInteractionAllowed: true,
		isCardDrawAllowed: true,
		isAnswerCorrect: false,
		amountPlayers: amountPlayers,
		players: [
			{
				name: undefined,
				hand: [],
				played: []
			},
			{
				name: undefined,
				hand: [],
				played: []
			}
		]
	};

	cpuTimer = undefined;

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.startNewGame();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.hasOwnProperty("players")) {
			this.setState(() => ({
				players: nextProps.players
			}));
			console.log("players: ", nextProps.players);
		}
		if (nextProps.hasOwnProperty("activePlayerId")) {
			this.setState(() => ({
				activePlayerId: parseInt(nextProps.activePlayerId)
			}));
		}
		if (nextProps.hasOwnProperty("isAnswerCorrect")) {
			console.log("correct?: ", nextProps.isAnswerCorrect);
			this.setState(() => ({
				isAnswerCorrect: nextProps.isAnswerCorrect
			}));
		}
	}

	startNewGame() {
		appStore.dispatch(cardgameActions.createGame(playerNames, cardSet));
		// appStore.dispatch(cardgameActions.startNextRound());
	}

	lockGame() {
		this.setState(() => ({
			isInteractionAllowed: false
		}));
	}

	unlockGame() {
		this.setState(() => ({
			isInteractionAllowed: true
		}));
	}

	handlePressBuzzer() {
		this.cpuTimer && clearTimeout(this.cpuTimer);
		console.log("cardgame: handlePressBuzzer: lockInteractions +++ ");
		appStore.dispatch(cardgameActions.triggerBuzzer(1));

		this.lockGame();

		setTimeout(() => {
			this.unlockGame();
			this.state.activePlayerId === 0 && this.doRobotStuff();
			console.log("cardgame: handlePressBuzzer: unlockInteractions ### ");
			console.log("this state...", this.state);
		}, 3000);
	}

	handlePressStack(playerId) {
		console.log("STACK PRESSED!!!", playerId);
		if (this.state.players[playerId].hand.length <= 1) {
			// no cards in stack anymore!
			console.log(
				"cardgame: handlePressStack: ## no cards in stack anymore ##"
			);
			return;
		}

		// playerId === 0 is CPU. CPU isnt allowd to click
		if (playerId === 0) {
			return;
		}

		if (this.state.isCardDrawAllowed === false) {
			return;
		}

		this.setState({ isCardDrawAllowed: false });

		if (this.state.activePlayerId === playerId) {
			appStore.dispatch(cardgameActions.drawCard(playerId));
			appStore.dispatch(cardgameActions.startNextRound());
		}

		// If we play the cpu will play after 3 sec delay
		if (playerId === 1) {
			this.doRobotStuff(playerId);
		}
	}

	doRobotStuff() {
		this.cpuTimer = setTimeout(() => {
			appStore.dispatch(cardgameActions.drawCard(0));
			appStore.dispatch(cardgameActions.startNextRound());
			this.setState({ isCardDrawAllowed: true });
		}, 3000);
	}

	isOwnStack(playerId) {
		return playerId === 1;
	}

	displayPlayerCounter(playerId) {
		return (
			this.state.players[playerId].hand.length && (
				<Player
					style={styles.player}
					playerName={this.state.players[playerId].name}
					amountCards={this.state.players[playerId].hand.length}
				/>
			)
		);
	}

	displayPlayerPlayed(playerId) {
		return (
			this.state.players[playerId].played.length && (
				<Card
					cardItem={
						this.state.players[playerId].played[
							this.state.players[playerId].played.length - 1
						]
					}
					isCardFaceUp={isCardFaceUp}
				/>
			)
		);
	}

	displayPlayerStack(playerId) {
		return (
			<TouchableOpacity
				style={styles.stack}
				onPress={() => this.handlePressStack(playerId)}
			>
				{this.state.players[playerId].hand.length && (
					<Stack amount={this.state.players[playerId].hand.length} />
				)}{" "}
			</TouchableOpacity>
		);
	}

	displayNoInteraction() {
		return !this.state.isInteractionAllowed && <NoInteraction />;
	}

	render() {
		//console.log('render state', this.state);
		return (
			<Layout colors={["#E9E9EF", "#E9E9EF"]}>
				{" "}
				{/*TOP COUNTER*/}
				<View style={styles.playerTop}>
					{this.displayPlayerCounter(0)}
				</View>
				{/*TOP PLAYED CARDS AND STACK*/}
				<View style={styles.cardTop}>
					{this.displayPlayerPlayed(0)}
					{this.displayPlayerStack(0)}{" "}
				</View>
				{/*BOTTOM COUNTER*/}
				<View style={styles.playerBottom}>
					{this.displayPlayerCounter(1)}
				</View>
				{/*BOTTOM PLAYED CARDS AND STACK*/}
				<View style={styles.cardBottom}>
					{this.displayPlayerPlayed(1)}
					{this.displayPlayerStack(1)}{" "}
				</View>
				{/*BUZZER*/}
				<View style={styles.buzzerButton}>
					<TouchableOpacity
						onPress={() =>
							this.handlePressBuzzer(this.state.activePlayerId)
						}
					>
						<BuzzerButton />
					</TouchableOpacity>{" "}
				</View>
				{/*NO INTERACTION ALLOWED OVERLAY*/}
				{/*{!this.state.isInteractionAllowed && (*/}
				{/*<View style={styles.noInteractionTop}>*/}
				{/*{this.displayNoInteraction()}*/}
				{/*</View>*/}
				{/*)}*/}
				{/*{!this.state.isInteractionAllowed && (*/}
				{/*<View style={styles.noInteractionMid}>*/}
				{/*{this.displayNoInteraction()}*/}
				{/*</View>*/}
				{/*)}*/}
				{/*{!this.state.isInteractionAllowed && (*/}
				{/*<View style={styles.noInteractionBottom}>*/}
				{/*{this.displayNoInteraction()}*/}
				{/*</View>*/}
				{/*)}*/}
				{/*ICON CORRECT*/}
				{!this.state.isInteractionAllowed &&
					this.state.isAnswerCorrect && (
						<View style={styles.buzzerCorrect}>
							<BuzzerCorrect />
						</View>
					)}
				{/*ICON INCORRECT*/}
				{!this.state.isInteractionAllowed &&
					!this.state.isAnswerCorrect && (
						<View style={styles.buzzerWrong}>
							<BuzzerWrong />
						</View>
					)}{" "}
			</Layout>
		);
	}
}

const mapStateToProps = state => ({
	players: cardgameFromContent.getContentPlayers(state),
	activePlayerId: cardgameFromContent.getActivePlayerId(state),
	isAnswerCorrect: cardgameFromContent.getIsAnswerCorrect(state)
});

export default connect(mapStateToProps)(Cardgame);
