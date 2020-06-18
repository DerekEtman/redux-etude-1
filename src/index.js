import React, { Component } from "react";
import { render } from "react-dom";
import logo from "./logo.svg";
import "./App.css";

import { createStore, bindActionCreators } from "redux";
import { connect, Provider } from "react-redux";

const initialState = {
	count: 0,
};

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET = "RESET";

const increment = () => ({
	type: INCREMENT,
});

const decrement = () => ({
	type: DECREMENT,
});

const resetValue = () => ({
	type: RESET,
});

const reducer = (state = initialState, action) => {
	if (action.type === INCREMENT) {
		return {
			count: state.count + 1,
		};
	} else if (action.type === DECREMENT) {
		return {
			count: state.count - 1,
		};
	}
	return state;
};

const store = createStore(reducer);

class Counter extends Component {
	render() {
		const { count, increment, decrement } = this.props;
		console.log({ count, increment });

		return (
			<main className="Counter">
				<p className="count">{count}</p>
				<section className="Controls">
					<button onClick={increment}>Increment</button>
					<button onClick={decrement}>Decrement</button>
					<button>Reset</button>
				</section>
			</main>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

const mapDispatchToProps ={
  increment,
  decrement,
};

const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter);

render(
	<Provider store={store}>
		<CounterContainer />
	</Provider>,
	document.getElementById("root")
);
