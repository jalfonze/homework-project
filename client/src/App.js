import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Analytics from "./analytics";
import Nav from "./nav";
import Welcome from "./welcome";

function App() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Nav />
                <Route exact path="/" render={() => <Welcome />} />
                <Route path="/analytics" render={() => <Analytics />} />
            </BrowserRouter>
        </React.Fragment>
    );
}
export default App;
