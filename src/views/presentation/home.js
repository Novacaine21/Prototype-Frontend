import React from "react";
import axios from "axios";

import baseURL from "../connect/connect";

//Axios
axios.defaults.baseURL = baseURL;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleLogin() {
        this.props.history.push("/login");
    }
    handleSignUp() {
        this.props.history.push("/sign_up");
    }
    componentDidMount() {
        if(localStorage.getItem("token")) {
            axios({
                method: "get",
                url: "/users/me",
                headers: { "x-auth": localStorage.getItem("token") }
            }).then((res) => {
                localStorage.setItem("_id", res.data._id);
                this.props.history.push("/dashboard");
            }).catch((err) => {
                this.props.history.push("/login");
            });
        }
    }
    render() {
        return (
            <div>
                <div id="home">
                    <button id="login_home" className="btn btn-default btn-success" onClick={this.handleLogin}>Login</button>
                    <button id="sign_up_home" className="btn btn-default btn-success" onClick={this.handleSignUp}>Sign Up</button>
                </div>
            </div>
        );
    }
};

export default Home;