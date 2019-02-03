import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import baseURL from "../connect/connect";

//Axios
axios.defaults.baseURL = baseURL;

class Records extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
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
            url: "/records",
            headers: { "x-auth": localStorage.getItem("token") }
        }).then((res) => {
            localStorage.setItem("records", JSON.stringify(res.data.records));
            this.populate(res.data.records);
        }).catch((err) => {
            this.props.history.push("/not_found");
        });
    }
    render() {
        return (
            <div>
                <div id="records">
                    <h1>SEARCH BY DISEASE</h1>
                    <input value={this.state.search} type="text" placeholder="search by disease" onChange={this.handleChange}></input>
                    <br />
                    <br />
                    <button className="btn btn-default btn-success" onClick={this.handleSearch}>Search</button>
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
                </div>
            </div>
        );
    }
};

export default withRouter(Records);
