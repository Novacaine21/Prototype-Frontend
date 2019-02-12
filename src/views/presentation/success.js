import React from "react";

class Success extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    $("#bg-div").addClass("bg-div-1 appdiv animated fadeInRight");
  }
componentWillUnmount() {
    $("#bg-div").removeClass("bg-div-1 appdiv animated fadeInRight");
  }
  render() {
    return (
      <div>
        <div id="success" className="page-body row">
          <h1 className="heading">Success!</h1>
          <p>Your file has been uploaded successfully.</p>
        </div>
      </div>
    );
  }
}

export default Success;
