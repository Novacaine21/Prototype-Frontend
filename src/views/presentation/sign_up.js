import React from "react";
import axios from "axios";

import baseURL from "../connect/connect";

//Axios
axios.defaults.baseURL = baseURL;

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
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
    handleSignUp(event) {
        event.preventDefault();
        var body = {
            email: this.state.email,
            password: this.state.password
        };
        axios({
            method: "post",
            url: "/users",
            data: body
        }).then((res) => {
            localStorage.setItem("token", res.headers["x-auth"]);
            localStorage.setItem("_id", res.data._id);
            this.props.history.push("/dashboard");
        }).catch((err) => {
            this.props.history.push("/not_found");
        });
    }
    render() {
        return (
            <div>
                <div id="sign_up">
                    <h3>SIGN UP</h3>
                    <form id="sign_up_form" onSubmit={this.handleSignUp}>
                        <label>Username:</label>
                        <input id="sign_up_email" value={this.state.email} type="text" placeholder="email" onChange={this.handleChangeUser}></input>
                        <br />
                        <label>Password:</label>
                        <input id="sign_up_password" value={this.state.password} type="text" placeholder="password" onChange={this.handleChangePass}></input>
                        <br />
                        <button id="sign_up_button" className="btn btn-default btn-success" type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        );
    }
};

export default SignUp;