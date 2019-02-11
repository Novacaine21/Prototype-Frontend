import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import axios from "axios";

import baseURL from "../connect/connect";

// Axios
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
    }

    componentDidMount() {
        $("#bg-div").addClass("bg-div-2 animated fadeInRightBig");
        $("#login").addClass("animated fadeInLeft");
    }

    componentWillUnmount() {
        $("#bg-div").removeClass("bg-div-2 animated fadeInRightBig");
        $("#login").removeClass("animated fadeInLeft");
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
        const body = {
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

    render() {
        return (
            <div>
                <div id="login" className="text-left page-body row">
                    <div className="col-md-6">
                        <h3 className="heading">Log in.</h3>
                        <form id="login_form" onSubmit={this.handleLogin}>
                            <div className="input-group float-label-control">
                                <span className="input-group-addon"><i className="icon fas fa-envelope" /></span>
                                <label className="form-line" htmlFor="login_email">
                                    <input id="login_email" className="form-control" value={this.state.email} type="text" placeholder="Email" onChange={this.handleChangeUser} />
                                </label>
                            </div>
                            <div className="input-group float-label-control">
                                <span className="input-group-addon"><i className="icon fas fa-key" /></span>
                                <label className="form-line" htmlFor="login_password">
                                    <input id="login_password" className="form-control" value={this.state.password} type="password" placeholder="Password" onChange={this.handleChangePass} />
                                </label>
                            </div>
                            <div className="row row-center">
                                <div className="center-div col-md-8">
                                    <a className="text-link" href="#login">Forgot password?</a>
                                </div>
                                <div className="col-md-4">
                                    <button id="login.sign_up_button" className="btn btn-default btn-1 pull-right" type="submit">Log in</button>
                                </div>
                            </div>
                        </form>
                        <div id="input_non_member" className="signup-link">
                            <p className="text-center">
                                No account?
                                <Link to="/sign_up" style={{ marginLeft: "10px" }} className="text-link">Sign Up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
