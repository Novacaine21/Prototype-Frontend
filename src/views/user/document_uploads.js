import React from "react";
import { Modal, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";

import baseURL from "../connect/connect";

// Axios
axios.defaults.baseURL = baseURL;

class DocumentUploads extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scanReport: <tr />,
            doctorPrescription: <tr />,
            doc: null,
            show: false,
            modalHeading: "",
            click: ""
        };
        this.populate = this.populate.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChangeDocument = this.handleChangeDocument.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "/downloads",
            headers: { "x-auth": localStorage.getItem("token") }
        }).then((res) => {
            localStorage.setItem("downloads", JSON.stringify(res.data.docs));
            this.populate(res.data.docs);
        }).catch((err) => {
            console.log(err);
        });
    }

    populate(records) {
        const scanReport = records.filter(record => record.type === "scan_report").map((record) => {
            return (
                <tr key={record._id}>
                    <td>{record.name}</td>
                </tr>
            );
        });
        const doctorPrescription = records.filter(record => record.type === "doctor_prescription").map((record) => {
            return (
                <tr key={record._id}>
                    <td>{record.name}</td>
                </tr>
            );
        });
        this.setState({
            scanReport,
            doctorPrescription
        });
    }

    handleClose() {
        this.setState({
            show: false
        });
    }

    handleChangeDocument(event) {
        this.setState({
            doc: event.target.files[0]
        });
    }

    handleClick(event) {
        let heading;
        if (event === "scan_report") {
            heading = "SCAN REPORT";
        } else if (event === "doctor_prescription") {
            heading = "DOCTOR PRESCRIPTION";
        }
        this.setState({
            show: true,
            click: event,
            modalHeading: heading
        });
    }

    handleSubmit() {
        if (this.state.doc) {
            const document = new FormData();
            document.append("file", this.state.doc, this.state.doc.name);
            axios({
                method: "post",
                url: "/upload",
                data: document,
                headers: { "x-auth": localStorage.getItem("token"), "x-type": this.state.click }
            }).then((res) => {
                alert(`Document "${res.data.name}" Submitted at ${new Date().toString()}.`);
                this.handleClose();
                this.componentDidMount();
            }).catch(() => {
                this.props.history.push("/not_found");
            });
        } else {
            alert("Select a document to upload!");
        }
    }

    render() {
        return (
            <div>
                <div id="bg-div" className="bg-div-1" />
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.modalHeading}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h3>Select new document: </h3>
                        <input id="file" type="file" onChange={this.handleChangeDocument} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                        <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>
                    </Modal.Footer>
                </Modal>
                <div id="document_uploads">
                    <div id="scan_report" className="file-upload">
                        <table className="text-center table table-hover child">
                            <thead>
                                <tr>
                                    <th className="text-center align-middle">Scan Reports</th>
                                    <button type="button" onClick={() => this.handleClick("scan_report")} className="add"><i className="fa fa-plus" /></button>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.scanReport}
                            </tbody>
                        </table>
                    </div>
                    <div id="doctor_prescription" className="file-upload">
                        <table className="text-center table table-hover child">
                            <thead>
                                <tr>
                                    <th className="text-center align-middle">Docter Prescription</th>
                                    <button type="button" onClick={() => this.handleClick("doctor_prescription")} className="add"><i className="fa fa-plus" /></button>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.doctorPrescription}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(DocumentUploads);
