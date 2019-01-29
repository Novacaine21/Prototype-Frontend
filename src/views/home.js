import React from "react";

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
    render() {
        return (
            <div>
                <div id="home">
                    <button id="login_home" className="btn btn-default btn-success" onClick={this.handleLogin} >Login</button>
                    <button id="sign_up_home" className="btn btn-default btn-success" onClick={this.handleSignUp}>Sign Up</button>
                </div>
            </div>
        );
    }
};

export default Home;