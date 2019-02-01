import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import baseURL from "./connect";

//Axios
axios.defaults.baseURL = baseURL;

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disease: "",
            medication: "",
            doctor: ""
        };
        this.handleChangeDisease = this.handleChangeDisease.bind(this);
        this.handleChangeMedication = this.handleChangeMedication.bind(this);
        this.handleChangeDoctor = this.handleChangeDoctor.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeDisease(event) {
        this.setState({
            disease: event.target.value
        });
    }
    handleChangeMedication(event) {
        this.setState({
            medication: event.target.value
        });
    }
    handleChangeDoctor(event) {
        this.setState({
            doctor: event.target.value
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        var body = {
            disease: this.state.disease,
            medication: this.state.medication,
            doctor: this.state.doctor
        };
        axios({
            method: "post",
            url: "/records",
            data: body,
            headers: { "x-auth": localStorage.getItem("token") }
        }).then((res) => {
            alert(`Record Submitted at ${res.data.enteredAt}.`);
            this.props.history.push("/success");
        }).catch((err) => {
            console.log(err);
            alert("Invalid Request!");
        });
    }
    render() {
        return (
            <div>
                <div id="form">
                    <h1>FORM</h1>
                    <form id="record_form" onSubmit={this.handleSubmit}>
                        <label>Disease:</label>
                        <input id="disease" value={this.state.disease} type="text" placeholder="disease" onChange={this.handleChangeDisease}></input>
                        <br />
                        <label>Medication:</label>
                        <input id="medication" value={this.state.medication} type="text" placeholder="medication" onChange={this.handleChangeMedication}></input>
                        <br />
                        <label>Doctor:</label>
                        <input id="doctor" value={this.state.doctor} type="text" placeholder="doctor" onChange={this.handleChangeDoctor}></input>
                        <br />
                        <button id="form_button" className="btn btn-default btn-success" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
};

export default withRouter(Form);
