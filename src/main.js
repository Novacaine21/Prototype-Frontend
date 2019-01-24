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

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            submit: ""
        };
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }
    handleChangeUser(event) {
        this.setState({
            username: event.target.value
        });
    }
    handleChangePass(event) {
        this.setState({
            password: event.target.value
        });
    }
    handleLogin(event) {
        event.preventDefault();
        //POST to url
    }
    handleSignUp(event) {
        event.preventDefault();
        //Redirect to another page
    }
    render() {
        return (
            <div>
                <div id="login_page" className="row">
                    <div id="login" className="col-md-6 text-center">
                        <h4>Login</h4>
                        <form id="input_user" onSubmit={this.handleLogin}>
                            <label>Username:<input value={this.state.username} type="text" placeholder="Email or Phone" onChange={this.handleChangeUser}></input></label><br />                   
                            <label>Password:<input value={this.state.password} type="text" placeholder="Password" onChange={this.handleChangePass}></input></label><br />
                            <a href="#">Forgot password?</a>
                            <button className="btn btn-default btn-primary" type="submit">Login</button>
                        </form>
                        <div id="input_non_member">
                            <p>No account?</p>
                            <button className="btn btn-default btn-primary" onClick={this.handleSignUp}>Sign Up</button>
                        </div>
                    </div>
                    <div id="logo" className="col-md-6">
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
                <Login />
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

