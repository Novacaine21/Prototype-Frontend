import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import fileDownload from "js-file-download";

import baseURL from "../connect/connect";

//Axios
axios.defaults.baseURL = baseURL;

class Documents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            docs: null,

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.populate = this.populate.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleChange(event) {
        this.setState({
            search: event.target.value
        });
    }
    handleSearch() {
        var docs = JSON.parse(localStorage.getItem("docs"));
        var regex = new RegExp(this.state.search, "gi");
        var result = docs.filter((doc) => doc.name.match(regex));
        this.populate(result);
    }
    handleDownload(id) {
        axios({
            method: "get",
            url: `/download/${id}`,
            responseType: "blob",
            headers: { "x-auth": localStorage.getItem("token") }
        }).then((res) => {
            var download = confirm("Do you wanna download this document?");
            if (download) {
                fileDownload(res.data, res.headers["x-name"]);
            }
        }).catch((err) => {
            this.props.history.push("/not_found");
        });

    }
    populate(docs) {
        var list = docs.map((doc) => {
            return (
                <tr key={doc._id} onClick={() => this.handleDownload(doc._id)}>
                    <td>{doc.name}</td>
                    <td>{doc.date}</td>
                </tr>
            );
        });
        this.setState({
            docs: list
        });
    }
    componentDidMount() {
        axios({
            method: "get",
            url: "/downloads",
            headers: { "x-auth": localStorage.getItem("token") }
        }).then((res) => {
            localStorage.setItem("docs", JSON.stringify(res.data.docs));
            this.populate(res.data.docs);
        }).catch((err) => {
            this.props.history.push("/not_found");
        });
    }
    render() {
        return (
            <div>
                {/* <div id="bg-div" className="bg-div-1"></div> */}
                <div id="document">
                    <div className="searchbar input-group float-label-control">
                        <span className="input-group-addon"><i className="icon fas fa-search"></i></span>
                        <label className="form-line"><input className="form-control sb-field" value={this.state.search} type="text" placeholder="Document Name" onChange={this.handleChange}></input></label>
                        <div >
                            <button className="btn btn-1 btn-default btn-success" onClick={this.handleSearch}>Search</button>
                        </div>
                    </div>
                    <table className="text-center table table-hover">
                        <thead>
                            <tr>
                                <th className="text-center align-middle">Document</th>
                                <th className="text-center align-middle">Entry Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.docs}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
};

export default withRouter(Documents);
