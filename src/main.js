"use strict";
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./style.scss";

//Redux Store
const NOTHING = "NOTHING";
const defaultState = {

};
const mainReducer = (state = defaultState, action) => {
    switch(action.type) {
        case NOTHING: 
            return state;
        default:
            return state;
    }
};
const nothingAction = () => {
    return {
        type: "NOTHING"
    };
};
const store = createStore(mainReducer);
store.subscribe(() => console.log(store.getState()));

//React Component
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <h1>Hello World!</h1>
            </div>
        );
    }
};

//Match state, dispatch to props
const mapStateToProps = (state) => {
    return {
        state: state
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        doNothing: () => {
            dispatch(nothingAction());
        }
    };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(App);

class Presentation extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Provider store={store}>
                <Container />
            </Provider>
        );
    }
};

ReactDOM.render(
    <Presentation />,
     document.getElementById("root"));

