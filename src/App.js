import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
	compose,
	createStore,
	combineReducers,
	bindActionCreators,
	applyMiddleware,
} from "redux";
import { act } from "react-dom/test-utils";

function App() {
	const makeLouder = (string) => string.toUpperCase();
	const repeatThreeTimes = (string) => string.repeat(3);
	const embolden = (string) => string.bold();

	const doIt = compose(embolden, repeatThreeTimes, makeLouder);
  const store = createStore(reducer);
	console.log(doIt("hello"));

	const calcReducer = (state = { value: 1 }, action) => {
		console.log("the action: ", action);

		if (action.type === "ADD") {
			const value = state.value;
			const amount = action.payload.amount;

			return {
				value: value + amount,
			};
		}
		return state;
	};

	const reducer = combineReducers({
		calculator: calcReducer,
	});

	console.log(reducer);

	const addAction = {
		type: "ADD",
		payload: {
			amount: 4,
		},
	};

	const createAddAction = (amount) => {
		return {
			type: "ADD",
			payload: {
				amount
			},
		};
	};


  const handrolledDispatched = store.dispatch(createAddAction(4));

  const dispatchAdd = bindActionCreator(createAddAction, store.dispatch)


  const bindActionCreators = (action, dispatch) => {
    return Object.keys(action).reduce((boundActions,key) => {
      boundActions[key] = bindActionCreator(actions[key],dispatch)
    },{})
  }

  const logger = ({getState}) => {
    return next => action => {
      console.log('middleWare', getState(), action);
      const value  = next(action);
      return value;
    };

  }

  const secondStore = createStore(reducer, applyMiddleware(logger));

	return <>hi</>;
}

export default App;
