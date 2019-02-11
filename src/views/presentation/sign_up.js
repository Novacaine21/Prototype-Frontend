import React from "react";
import $ from "jquery";
import axios from "axios";

import baseURL from "../connect/connect";

// Axios
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

    componentDidMount() {
        $("#bg-div").addClass("bg-div-2 animated fadeInRightBig");
        $("#sign_up").addClass("animated fadeInLeft");
    }

    componentWillUnmount() {
        $("#bg-div").removeClass("bg-div-2 animated fadeInRightBig");
        $("#sign_up").removeClass("animated fadeInLeft");
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
        const body = {
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
            this.props.history.push("/profile");
        }).catch((err) => {
            this.props.history.push("/not_found");
        });
    }

    render() {
        return (
            <div>
                <div id="sign_up" className="text-left page-body row">
                    <div className="col-md-6">
                        <h3 className="heading">Sign Up.</h3>
                        <form id="sign_up_form" onSubmit={this.handleSignUp}>
                            <div className="input-group float-label-control">
                                <span className="input-group-addon"><i className="icon fas fa-envelope" /></span>
                                <label className="form-line" htmlFor="sign_up_email">
                                    <input id="sign_up_email" className="form-control" value={this.state.email} type="text" placeholder="Email" onChange={this.handleChangeUser} />
                                </label>
                            </div>
                            <div className="input-group float-label-control">
                                <span className="input-group-addon"><i className="icon fas fa-key" /></span>
                                <label className="form-line" htmlFor="sign_up_password">
                                    <input id="sign_up_password" className="form-control" value={this.state.password} type="password" placeholder="Password" onChange={this.handleChangePass} />
                                </label>
                            </div>
                            <button id="sign_up_button" className="btn btn-default btn-1" type="submit">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;
