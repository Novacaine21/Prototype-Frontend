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
class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div id="header" className="row">
                    <div id="logo" className="col-md-2">
                        <h1>MedicHive</h1>
                    </div>
                    <div id="nav" className="col-md-10">
                        <ul className="nav nav-tabs navbar-right">
                            <li><a href="#">Link</a></li>
                            <li><a href="#">Link</a></li>
                            <li><a href="#">Link</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
};
class Footer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div id="footer" className="row">
                    <div id="social" className="col-md-4 text-center">
                        <a href="#"><i className="fa fa-facebook icon"></i></a>
                        <a href="#"><i className="fa fa-instagram icon"></i></a>
                        <a href="#"><i className="fa fa-twitter icon"></i></a>   
                        <hr />
                        <div id="contact">
                            <h4>Contact Us</h4>
                            <p>Lorem Ipsum</p>
                        </div>
                    </div>
                    <div id="lorem" className="col-md-8 text-center">
                        Lorem Ipsum
                    </div>
                </div>
            </div>
        );
    }
};

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Header />
                <Footer />
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

