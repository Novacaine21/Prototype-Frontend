// "use strict";
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

import "./style.scss";

//Axios
axios.defaults.baseURL = "http://localhost:3000";

//React Component
class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div id="header">
                </div>
            </div>
        );
    }
};

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div id="footer">
                    <h1>Footer</h1>
                </div>
            </div>
        );
    }
};

class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div id="home">
                    <h1><a href="#">LOGIN</a></h1>
                    <h1><a href="#">SIGN UP</a></h1>
                </div>
            </div>
        );
    }
};

class NotFound extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div id="not_found">
                    <h1>404 ERROR!</h1>
                </div>
            </div>
        );
    }
};

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            submit: ""
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
    handleSignUp() {
        event.preventDefault();
        //Axios SIGNUP
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

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            submit: ""
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
            this.props.setID(res.data._id);
        }).catch((err) => {
            console.log(err);
            alert("Invalid email or password!");
        });
    }
    handleSignUp(event) {
        event.preventDefault();
        //Redirect to another page
        console.log(localStorage.getItem("token"));
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

class DashBoard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div id="dashboard">
                </div>
            </div>
        );
    }
};

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Header />
                <Login  />
                <SignUp />
                <Footer />
            </div>
        );
    }
};

export default App;

ReactDOM.render(
    <App />,
    document.getElementById("root"));


// import React from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// function BasicExample() {
//     return (
//         <Router>
//             <div>
//                 <ul>
//                     <li>
//                         <Link to="/">Home</Link>
//                     </li>
//                     <li>
//                         <Link to="/about">About</Link>
//                     </li>
//                     <li>
//                         <Link to="/topics">Topics</Link>
//                     </li>
//                 </ul>

//                 <hr />

//                 <Route exact path="/" component={Home} />
//                 <Route path="/about" component={About} />
//                 <Route path="/topics" component={Topics} />
//             </div>
//         </Router>
//     );
// }

// class Home extends React.Component {
//     render() {
//         return (
//         <div>
//             <h2>Home</h2>
//         </div>
//         );
//     }
// }

// function About() {
//     return (
//         <div>
//             <h2>About</h2>
//         </div>
//     );
// }

// function Topics({ match }) {
//     console.log(match.url);
//     return (
//         <div>
//             <h2>Topics</h2>
//             <ul>
//                 <li>
//                     <Link to={`${match.url}/rendering`}>Rendering with React</Link>
//                 </li>
//                 <li>
//                     <Link to={`${match.url}/components`}>Components</Link>
//                 </li>
//                 <li>
//                     <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
//                 </li>
//             </ul>

//             <Route path={`${match.path}/:topicId`} component={Topic} />
//             <Route
//                 exact
//                 path={match.path}
//                 render={() => <h3>Please select a topic.</h3>}
//             />
//         </div>
//     );
// }

// function Topic({ match }) {
//     return (
//         <div>
//             <h3>{match.params.topicId}</h3>
//         </div>
//     );
// }

// ReactDOM.render(
//     <BasicExample />,
//     document.getElementById("root"));