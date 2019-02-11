import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import axios from "axios";

import Overview from "./overview";
import MedicalHistory from "./medical_history";
import DocumentUploads from "./document_uploads";
import baseURL from "../connect/connect";

// Axios
axios.defaults.baseURL = baseURL;

class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "overview"
        };
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "/users/me",
            headers: { "x-auth": localStorage.getItem("token") }
        }).then((res) => {
            localStorage.setItem("_id", res.data.user);
        }).catch((err) => {
            console.log(err);
            this.props.history.push("/not_found");
        });
    }

    render() {
        return (
            <div>
                <div id="dashboard" className="page-body">
                    <div id="bg-div" className="bg-div-1" />
                    <h1 className="heading">Dashboard.</h1>
                    <Tabs id="dashboard_tab" className="dashtab" activeKey={this.state.key} onSelect={key => this.setState({ key })}>
                        <Tab eventKey="overview" title="OVERVIEW">
                            <h4><Link to="/records" className="links">Search Records</Link></h4>
                            <h4><Link to="/documents" className="links">Search Documents</Link></h4>
                            <Overview />
                        </Tab>
                        <Tab eventKey="medical-history" title="MEDICAL HISTORY">
                            <MedicalHistory />
                        </Tab>
                        <Tab eventKey="document-uploads" title="DOCUMENT UPLOADS">
                            <DocumentUploads />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default withRouter(DashBoard);
