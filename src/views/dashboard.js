import React from "react";
import { withRouter } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import axios from "axios";

import Form from "./form";
import baseURL from "./connect";

//Axios
axios.defaults.baseURL = baseURL;

class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            key: "search",
            records: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.populate = this.populate.bind(this);
    }
    handleChange(event) {
        this.setState({
            search: event.target.value
        });
    }
    handleSearch() {
        var records = JSON.parse(localStorage.getItem("records"));
        var regex = new RegExp(this.state.search, "gi");
        var result = records.filter((record) => record.disease.match(regex));
        this.populate(result);
    }
    populate(records) {
        var list = records.map((record) => {
            return (
                <tr key={record._id}>
                    <td>{record.disease}</td>
                    <td>{record.medication}</td>
                    <td>{record.doctor}</td>
                    <td>{record.enteredAt}</td>
                </tr>
            )
        }); 
        this.setState({
            records: list
        });
    }
    componentDidMount() {
        axios({
            method: "get",
            url: "/users/me",
            headers: { "x-auth": localStorage.getItem("token") }
        }).then((res) => {
            localStorage.setItem("_id", res.data._id)
        }).catch((err) => {
            alert("Not logged in!");
            this.props.history.push("/login");
        });
        axios({
            method: "get",
            url: "/records",
            headers: { "x-auth": localStorage.getItem("token") }
        }).then((res) => {
            localStorage.setItem("records", JSON.stringify(res.data.records));
            this.populate(res.data.records);
        }).catch((err) => {
            alert("Error! Login!");
            this.props.history.push("/login");
        });
    }
    render() {
        return (
            <div>
                <div id="dashboard">
                    <Tabs id="dashboard_tab" activeKey={this.state.key} onSelect={(key) => this.setState({ key })}>
                        <Tab eventKey="search" title="RECORDS">
                            <h1>SEARCH BY DISEASE</h1>
                            <input id="search" value={this.state.search} type="text" placeholder="search by disease" onChange={this.handleChange}></input>
                            <br />
                            <br />
                            <button id="search_button" className="btn btn-default btn-success" onClick={this.handleSearch}>Search</button>
                            <hr />
                            <table className="text-center table table-hover">
                                <thead>
                                    <tr>
                                        <th className="text-center align-middle">Disease</th>
                                        <th className="text-center align-middle">Medication</th>
                                        <th className="text-center align-middle">Doctor</th>
                                        <th className="text-center align-middle">Entry Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.records}
                                </tbody>
                            </table>
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