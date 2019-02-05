import React from "react";

class Success extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div id="bg-div" className="bg-div-1"></div>
        <div id="success" className="page-body row">
          <h1 className="heading">Success!</h1>
          <p>Your file has been uploaded successfully.</p>
        </div>
      </div>
    );
  }
}

export default Success;
