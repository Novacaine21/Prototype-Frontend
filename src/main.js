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
import Profile from "./views/user/profile";
import DashBoard from "./views/user/dashboard";
import Records from "./views/user/records";
import Documents from "./views/user/documents";

import "./style.scss";

// React Component

const App = () => {
    return (
        <div>
            <Router>
                <div>
                    <div id="bg-div" className="bg-div-1" />
                    <Header />
                    <Route exact path="/" component={withRouter(Home)} />
                    <Route exact path="/login" component={withRouter(Login)} />
                    <Route exact path="/sign_up" component={withRouter(SignUp)} />
                    <Route exact path="/profile" component={withRouter(Profile)} />
                    <Route exact path="/dashboard" component={withRouter(DashBoard)} />
                    <Route exact path="/not_found" component={withRouter(NotFound)} />
                    <Route exact path="/success" component={withRouter(Success)} />
                    <Route exact path="/records" component={withRouter(Records)} />
                    <Route exact path="/documents" component={withRouter(Documents)} />
                    <Footer />
                </div>
            </Router>
        </div>
    );
};

export default App;

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
