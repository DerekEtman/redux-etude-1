import React, { Component } from "react";
import { render } from "react-dom";
import logo from "./logo.svg";
import "./App.scss";

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

const reset = () => ({
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
	}else if (action.type === RESET){
		return {
			count: 0,
		};
	}
	return state;
};

const store = createStore(reducer);

class Counter extends Component {
	render() {
		const { count, increment, decrement, reset } = this.props;
		console.log({ count, increment, reset });

		return (
			<main className="Counter">
				<p className="Count">{count}</p>
				<section className="Controls">
					<button onClick={increment}>Increment</button>
					<button onClick={decrement}>Decrement</button>
					<button onClick={reset}>Reset</button>
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
  reset
};

const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter);

render(
	<Provider store={store}>
		<CounterContainer />
	</Provider>,
	document.getElementById("root")
);
