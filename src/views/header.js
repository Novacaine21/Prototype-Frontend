import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

//Axios
axios.defaults.baseURL = "http://localhost:3000";

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
            this.props.history.push("/");
        }).catch((err) => {
            console.log(err);
            localStorage.removeItem("token");
            localStorage.removeItem("records");
            this.props.history.push("/not_found");
        });
    }
    render() {
        if(localStorage.getItem("token")) {
            return (
                <div>
                    <div id="header">
                        <Link to="/">Home</Link>
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