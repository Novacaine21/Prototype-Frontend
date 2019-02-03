"use strict";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";

import Home from "./views/home";
import Header from "./views/header";
import Footer from "./views/footer";
import NotFound from "./views/not_found";
import Login from "./views/login";
import SignUp from "./views/sign_up";
import DashBoard from "./views/dashboard";
import Success from "./views/success";

import "./style.scss";

//React Component
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Header />
                        <br />
                        <br />
                        <hr />
                        <Route exact path="/" component={withRouter(Home)} />
                        <Route exact path="/login" component={withRouter(Login)} />
                        <Route exact path="/sign_up" component={withRouter(SignUp)} />
                        <Route exact path="/dashboard" component={withRouter(DashBoard)} />
                        <Route exact path="/not_found" component={withRouter(NotFound)} />
                        <Route exact path="/success" component={withRouter(Success)} />
                        <Footer />
                    </div>
                </Router>
            </div>
        );
    }
};

export default App;

ReactDOM.render(
    <App />,
    document.getElementById("root"));

