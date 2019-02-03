import React from "react";
import axios from "axios";

import baseURL from "../connect/connect";

//Axios
axios.defaults.baseURL = baseURL;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }
    handleChangeUser(event) {
        this.setState({
            email: event.target.value
        });
    }
    handleChangePass(event) {
        this.setState({
            password: event.target.value
        });
    }
    handleLogin(event) {
        event.preventDefault();
        var body = {
            email: this.state.email,
            password: this.state.password
        };
        axios({
            method: "post",
            url: "/users/login",
            data: body
        }).then((res) => {
            localStorage.setItem("token", res.headers["x-auth"]);
            localStorage.setItem("_id", res.data._id);
            this.props.history.push("/dashboard");
        }).catch((err) => {
            this.props.history.push("/not_found");
        });
    }
    handleSignUp() {
        this.props.history.push("/sign_up");
    }
    render() {
        return (
            <div>
                <div id="login">
                    <h3>LOGIN</h3>
                    <form id="login_form" onSubmit={this.handleLogin}>
                        <label>Username:</label>
                        <input id="login_email" value={this.state.email} type="text" placeholder="email" onChange={this.handleChangeUser}></input>
                        <br />
                        <label>Password:</label>
                        <input id="login_password" value={this.state.password} type="text" placeholder="password" onChange={this.handleChangePass}></input>
                        <br />
                        <button id="login_button" className="btn btn-default btn-success" type="submit">Login</button>
                        <a href="#">Forgot password?</a>
                    </form>
                    <br />
                    <br />
                    <hr />
                    <h3>SIGNUP</h3>
                    <button id="login.sign_up_button" className="btn btn-default btn-success" onClick={this.handleSignUp}>Sign Up</button>
                </div>
            </div>
        );
    }
};

export default Login;