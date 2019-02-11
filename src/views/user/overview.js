import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import baseURL from "../connect/connect";

// Axios
axios.defaults.baseURL = baseURL;

class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            age: "",
            weight: "",
            sex: "",
            occupation: "",
            address: ""
        };
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "/users/me",
            headers: { "x-auth": localStorage.getItem("token") }
        }).then((res) => {
            localStorage.setItem("_id", res.data.user);
            if (JSON.stringify(res.data.userDetails).length > 2) {
                this.setState({
                    age: res.data.userDetails.age,
                    weight: res.data.userDetails.weight,
                    sex: res.data.userDetails.sex,
                    occupation: res.data.userDetails.occupation,
                    address: res.data.userDetails.address
                });
            }
        }).catch((err) => {
            console.log(err);
            this.props.history.push("/not_found");
        });
    }

    render() {
        return (
            <div>
                <div id="bg-div" className="bg-div-1" />
                <div id="overview">
                    <h1>OVERVIEW</h1>
                    <h3>AGE</h3>
                    <hr />
                    {this.state.age}
                    <br />
                    <h3>WEIGHT</h3>
                    <hr />
                    {this.state.weight}
                    <br />
                    <h3>SEX</h3>
                    <hr />
                    {this.state.sex}
                    <br />
                    <h3>OCCUPATION</h3>
                    <hr />
                    {this.state.occupation}
                    <br />
                    <h3>ADDRESS</h3>
                    <hr />
                    {this.state.address}
                    <br />
                </div>
            </div>
        );
    }
}

export default withRouter(Overview);
