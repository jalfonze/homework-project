import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <Fragment>
            <div className="navbar">
                <h3>
                    <Link to="/">Home</Link>
                </h3>
                <h3>
                    <Link to="/analytics">CO2 Emission Table</Link>
                </h3>
            </div>
        </Fragment>
    );
}
