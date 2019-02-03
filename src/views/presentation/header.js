import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

import baseURL from "../connect/connect";

//Axios
axios.defaults.baseURL = baseURL;

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout() {
        axios({
            method: "delete",
            url: "/users/me/token",
            headers: { "x-auth": localStorage.getItem("token") }
        }).then((res) => {
            console.log(res.data);
            localStorage.removeItem("token");
            localStorage.removeItem("records");
            localStorage.removeItem("docs");
            localStorage.removeItem("_id");
            this.props.history.push("/");
        }).catch((err) => {
            console.log(err);
            localStorage.removeItem("token");
            localStorage.removeItem("records");
            localStorage.removeItem("docs");
            localStorage.removeItem("_id");
            this.props.history.push("/not_found");
        });
    }
    componentDidMount() {
        axios({
            method: "get",
            url: "/users/me",
            headers: { "x-auth": localStorage.getItem("token") }
        }).then((res) => {
            localStorage.setItem("_id", res.data._id)
        }).catch((err) => {
            localStorage.removeItem("token");
            this.props.history.push("/");
        });
    }
    render() {
        if(localStorage.getItem("token")) {
            return (
                <div>
                    <div id="header">
                        <Link to="/dashboard">Dashboard</Link>
                        <br />
                        <button id="logout_button" className="btn btn-default btn-danger" onClick={this.handleLogout}>Logout</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div id="header">
                        <Link to="/">Home</Link>
                        <br />
                        <Link to="/login">Login</Link>
                        <br />
                        <Link to="/sign_up">Sign Up</Link>
                    </div>
                </div>
            );
        }
    }
};

export default withRouter(Header);