import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import Navigator from "./App.navigator";
import appStore from "./App.store";

const mapStateToProps = state => {
	return { ...state };
};

const ConnectedNavigator = connect(mapStateToProps)(Navigator);

class App extends Component {
	render() {
		return (
			<Provider store={appStore}>
				<ConnectedNavigator />
			</Provider>
		);
	}
}

export default App;
