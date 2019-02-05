import React from "react";

class NotFound extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div id="not_found" className="page-body row">
                    <h1 className="heading">Page not found!</h1>
                    <p>Sorry. We couldn't find the page.</p>
                </div>
            </div>
        );
    }
};

export default NotFound;
