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
        console.log(__dirname);
        $("#bg-div").addClass("bg-div-1 animated fadeInRight");
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
    componentDidMount() {
        $("#bg-div").addClass("bg-div-1 appdiv animated fadeInRight");
    }
    componentWillUnmount() {
        $("#bg-div").removeClass("bg-div-1 appdiv animated fadeInRight");
    }
    render() {
        return (
            <div>
                <div id="home" className="page-body">
                    <h1 className="heading">We Take Care Of Your Medical Records.</h1>
                    <p >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisi sem, hendrerit a auctor ac, pellentesque nec enim. Aliquam eu risus ut tortor consequat ornare.</p>
                    <div className="row home-buttons">
                        <button id="login_home" className="home-btn btn btn-default btn-1 pull-left" onClick={this.handleLogin}>Login</button>
                        <button id="sign_up_home" className="home-btn btn btn-default btn-1 " onClick={this.handleSignUp}>Sign Up</button>
                    </div>
                    <img className="home-img" src="/public/images/homepage-illustration.png"></img>
                </div>
            </div>
        );
    }
};

export default Home;