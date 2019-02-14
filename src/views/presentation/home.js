import React from "react";
import axios from "axios";
import $ from "jquery";

import baseURL from "../connect/connect";

// Axios
axios.defaults.baseURL = baseURL;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
        $("#bg-div").addClass("bg-div-1 animated fadeInRight");
    }

    componentWillUnmount() {
        $("#bg-div").removeClass("bg-div-1 animated fadeInRight");
    }

    handleLogin() {
        this.props.history.push("/login");
    }

    handleSignUp() {
        this.props.history.push("/sign_up");
    }

    render() {
        return (
            <div>
                <div id="home" className="text-left page-body">
                    <h1 className="heading">We Take Care Of Your Medical Records.</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisi sem, hendrerit a auctor ac, pellentesque nec enim. Aliquam eu risus ut tortor consequat ornare.</p>
                    <div className="row home-buttons">
                        <button id="login_home" className="home-btn btn btn-1 pull-left" type="button" onClick={this.handleLogin}>Login</button>
                        <button id="sign_up_home" className="home-btn btn btn-1 " type="button" onClick={this.handleSignUp}>Sign Up</button>
                    </div>
                    <img className="home-img" src="/public/images/homepage-illustration.png" alt="home_page_illustration" />
                </div>
            </div>
        );
    }
}

export default Home;
