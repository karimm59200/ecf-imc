import React from 'react';
import {Link, NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                {/*<Link className="navbar-brand" to="/"><i className="bi bi-globe"></i>eImc</Link>*/}
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {/*<NavLink className="nav-link" to="/">Home</NavLink>*/}
                    </div>
                </div>
            </nav>

        </div>
    );
};

export default NavBar;