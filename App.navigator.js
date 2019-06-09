import React, { Component } from "react";

import Home from "./features/home/containers/home/home";
import Loadgame from "./features/loadgame/containers/loadgame/loadgame";
import Cardgame from "./features/cardgame/containers/cardgame/cardgame";
import Resultscreen from "./features/resultscreen/containers/resultscreen/resultscreen";

import { createStackNavigator } from "react-navigation";

export const AppNavigator = new createStackNavigator(
	{
		Home: {
			screen: Home
		},
		Loadgame: {
			screen: Loadgame
		},
		Cardgame: {
			screen: Cardgame
		},
		Resultscreen: {
			screen: Resultscreen
		}
	},
	{
		mode: "card",
		headerMode: "none"
	}
);

class Nav extends Component {
	render() {
		return <AppNavigator />;
	}
}

export default Nav;
