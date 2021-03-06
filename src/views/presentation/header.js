import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

import baseURL from "../connect/connect";

// Axios
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
            localStorage.removeItem("token");
            localStorage.removeItem("records");
            localStorage.removeItem("docs");
            this.props.history.push("/");
        }).catch((err) => {
            console.log(err);
            localStorage.removeItem("token");
            localStorage.removeItem("records");
            localStorage.removeItem("docs");
            this.props.history.push("/not_found");
        });
    }

    render() {
        if (localStorage.getItem("token")) {
            return (
                <div>
                    <div id="header" className="row navbar">
                        <div id="logo" className="logo col-md-2">
                            <h1><Link className="logo-link" to="/">MedicHive</Link></h1>
                        </div>
                        <div className="col-md-10">
                            <ul className="nav nav-tabs navbar-right">
                                <li><Link to="/dashboard" className="links">Dashboard</Link></li>
                                <li><Link to="/profile" className="links">Me</Link></li>
                                <li><a id="logout_button" href="#logout_button" className="links" style={{ cursor: "pointer" }} onClick={this.handleLogout}>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div id="header" className="row navbar">
                    <div id="logo" className="logo col-md-2">
                        <h1><Link to="/" className="logo-link">MedicHive</Link></h1>
                    </div>
                    <div id="nav" className="col-md-10">
                        <ul className="nav nav-tabs navbar-right">
                            <li><Link to="/" className="links">About Us</Link></li>
                            <li><Link to="/login" className="links">Login</Link></li>
                            <li><Link to="/sign_up" className="links">Sign Up</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);
