import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import baseURL from "../connect/connect";

// Axios
axios.defaults.baseURL = baseURL;

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            age: "",
            weight: "",
            sex: "",
            occupation: "",
            address: "",
            newAccount: true
        };
        this.handleChangeAge = this.handleChangeAge.bind(this);
        this.handleChangeWeight = this.handleChangeWeight.bind(this);
        this.handleChangeSex = this.handleChangeSex.bind(this);
        this.handleChangeOccupation = this.handleChangeOccupation.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                    address: res.data.userDetails.address,
                    newAccount: false
                });
            }
        }).catch((err) => {
            console.log(err);
            this.props.history.push("/not_found");
        });

        axios({
            method: "get",
            url: "/record",
            headers: { "x-auth": localStorage.getItem("token") }
        }).then((res) => {
            if (res.data.record.length === 0) {
                axios({
                    method: "post",
                    url: "/record",
                    headers: { "x-auth": localStorage.getItem("token") }
                }).then((resp) => {
                    localStorage.setItem("rec_id", resp.data._id);
                }).catch((error) => {
                    console.log(error);
                    this.props.history.push("/not_found");
                });
            }
        }).catch((err) => {
            console.log(err);
            this.props.history.push("/not_found");
        });
    }

    handleChangeAge(event) {
        this.setState({
            age: event.target.value
        });
    }

    handleChangeWeight(event) {
        this.setState({
            weight: event.target.value
        });
    }

    handleChangeSex(event) {
        this.setState({
            sex: event.target.value
        });
    }

    handleChangeOccupation(event) {
        this.setState({
            occupation: event.target.value
        });
    }

    handleChangeAddress(event) {
        this.setState({
            address: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const body = {
            age: this.state.age,
            weight: this.state.weight,
            sex: this.state.sex,
            occupation: this.state.occupation,
            address: this.state.address
        };
        if (this.state.newAccount) {
            axios({
                method: "post",
                url: "/users/me",
                data: body,
                headers: { "x-auth": localStorage.getItem("token") }
            }).then((res) => {
                alert(`Account created successfully at ${new Date().toString()}.`);
                this.props.history.push("/dashboard");
            }).catch((err) => {
                console.log(err);
                this.props.history.push("/not_found");
            });
        } else {
            axios({
                method: "patch",
                url: "/users/me",
                data: body,
                headers: { "x-auth": localStorage.getItem("token") }
            }).then((res) => {
                alert(`Account updated successfully at ${new Date().toString()}.`);
                this.props.history.push("/dashboard");
            }).catch((err) => {
                console.log(err);
                this.props.history.push("/not_found");
            });
        }
    }

    render() {
        return (
            <div>
                <div id="bg-div" className="bg-div-1" />
                <div id="profile">
                    <h1>PROFILE</h1>
                    <br />
                    <hr />
                    <form id="profile_form" onSubmit={this.handleSubmit}>
                        <label htmlFor="age">
                            AGE:
                            <input id="age" value={this.state.age} type="number" placeholder="Age" onChange={this.handleChangeAge} required />
                        </label>
                        <br />
                        <label htmlFor="weight">
                            WEIGHT:
                            <input id="weight" value={this.state.weight} type="number" placeholder="Weight" onChange={this.handleChangeWeight} required />
                        </label>
                        <br />
                        <label htmlFor="sex">
                            SEX:
                            <input id="sex" value={this.state.sex} type="text" placeholder="Male/Female" onChange={this.handleChangeSex} required />
                        </label>
                        <br />
                        <label htmlFor="occupation">
                            OCCUPATION:
                            <input id="occupation" value={this.state.occupation} type="text" placeholder="Occupation" onChange={this.handleChangeOccupation} />
                        </label>
                        <br />
                        <label htmlFor="address">
                            ADDRESS:
                            <input id="address" value={this.state.address} type="text" placeholder="Address" onChange={this.handleChangeAddress} />
                        </label>
                        <br />
                        <button id="profile_button" className="btn btn-default btn-success" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Profile);
