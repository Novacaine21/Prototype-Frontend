import React from "react";

const Footer = () => {
    return (
        <div>
            <div id="footer" className="footer row">
                <div id="social" className="top-bar">
                    <a href="https://github.com/GaurisankarJ/" target="_blank" rel="noopener noreferrer"><i className="social fa fa-code" /></a>
                    <a href="https://dribbble.com/novacaine21" target="_blank" rel="noopener noreferrer"><i className="social fa fa-palette" /></a>
                    <a href="https://www.linkedin.com/in/sandheepp" target="_blank" rel="noopener noreferrer"><i className="social fa fa-user-tie" /></a>
                </div>
                <div className="row">
                    <div id="contact" className="col-md-4">
                        <hr />
                        <h4 className="footer-head">Contact Us</h4>
                        <p className="footer-link">Lorem Ipsum</p>
                    </div>
                    <div id="lorem" className="right-bar col-md-8">
                        <div className="footer-list">
                            <p className="footer-head">Lorem Ipsum</p>
                            <p className="footer-link">Lorem Ipsum sis</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
