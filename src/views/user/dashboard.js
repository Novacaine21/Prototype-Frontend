import React from "react";
import { withRouter } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import axios from "axios";

import Form from "./form";
import Records from "./records";
import Documents from "./documents";
import baseURL from "../connect/connect";

//Axios
axios.defaults.baseURL = baseURL;

class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "search-records"
        };
    }
    componentDidMount() {
        axios({
            method: "get",
            url: "/users/me",
            headers: { "x-auth": localStorage.getItem("token") }
        }).then((res) => {
            localStorage.setItem("_id", res.data._id)
        }).catch((err) => {
            this.props.history.push("/not_found");
        });
    }
    render() {
        return (
            <div>
                <div id="dashboard" className="page-body">
                    <h1 className="heading">Dashboard.</h1>
                    <Tabs id="dashboard_tab" className="dashtab" activeKey={this.state.key} onSelect={(key) => this.setState({ key })}>
                        <Tab eventKey="search-records" title="RECORDS">
                            <Records />
                        </Tab>
                        <Tab eventKey="search-documents" title="DOCUMENTS">
                            <Documents />
                        </Tab>
                        <Tab eventKey="add" title="ADD">
                            <Form />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
};

export default withRouter(DashBoard);
