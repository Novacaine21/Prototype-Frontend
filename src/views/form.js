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
            doctor: "",
            doc: null
        };
        this.handleChangeDisease = this.handleChangeDisease.bind(this);
        this.handleChangeMedication = this.handleChangeMedication.bind(this);
        this.handleChangeDoctor = this.handleChangeDoctor.bind(this);
        this.handleChangeDocument = this.handleChangeDocument.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
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
    handleChangeDocument(event) {
        this.setState({
            doc: event.target.files[0]
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
    handleUpload(event) {
        event.preventDefault();
        var document = new FormData()
        document.append("file", this.state.doc, this.state.doc.name)
        axios({
            method: "post",
            url: "/upload",
            data: document,
            headers: { "x-auth": localStorage.getItem("token") }
        }).then((res) => {
            alert(`Document "${res.data.name}" Submitted at ${new Date().toString()}.`);
            this.props.history.push("/success");
        }).catch((err) => {
            console.log(err);
            alert("Invalid Request!");
        });
        console.log(this.state.doc);
    }
    render() {
        return (
            <div>
                <div id="form">
                    <h1>FORM DATA</h1>
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
                    <h1>FORM DOCUMENT</h1>
                    <form id="document_form" onSubmit={this.handleUpload}>
                        <input id="file" type="file" onChange={this.handleChangeDocument}></input>
                        <br />
                        <button id="form_button" className="btn btn-default btn-success" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
};

export default withRouter(Form);
