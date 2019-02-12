"use strict";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";

import Header from "./views/presentation/header";
import Footer from "./views/presentation/footer";
import Home from "./views/presentation/home";
import NotFound from "./views/presentation/not_found";
import Success from "./views/presentation/success";
import Login from "./views/presentation/login";
import SignUp from "./views/presentation/sign_up";
import DashBoard from "./views/user/dashboard";

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
                        <div className="site">
                            <Header />
                            <div className="sitebody">
                                <div id="bg-div"></div>
                                <Route exact path="/" component={withRouter(Home)} />
                                <Route exact path="/login" component={withRouter(Login)} />
                                <Route exact path="/sign_up" component={withRouter(SignUp)} />
                                <Route exact path="/dashboard" component={withRouter(DashBoard)} />
                                <Route exact path="/not_found" component={withRouter(NotFound)} />
                                <Route exact path="/success" component={withRouter(Success)} />
                            </div>
                            <Footer />
                        </div>
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

