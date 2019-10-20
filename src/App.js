import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import history from "./history";
import Home from "./screens/Home";
import SiteHeader from "./components/SiteHeader";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Contact from "./components/Contact";
import Friend from "./components/Friend";
import SingleNew from "./components/SingleNew";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2196f3"
    },
    secondary: {
      main: "#ffffff"
    }
  }
});

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <div>
            <Router history={history}>
              <div>
                <SiteHeader />
                <Route exact path="/" component={Home} />
                <Route exact path="/kontakty" component={Contact} />
                <Route path="/kamos/:id" component={Friend} />
                <Route exact path="/novinka/:id" component={SingleNew} />
              </div>
            </Router>
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
