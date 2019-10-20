import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Typography, withStyles } from "@material-ui/core";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import GoogleMapReact from "google-map-react";
import ScrollButton from "./ScrollButton";
import FooterFriends from "./FooterFriends";
import DirectionSnackbar from "./MessageSent";

const styles = theme => ({
  mainContact: {
    padding: "24px",
    marginTop: "30px",
    backgroundColor: "#d7fae8"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  },
  contactForm: {
    padding: "24px",
    marginTop: "30px"
  },
  button: {
    float: "right",
    backgroundColor: "#d7fae8"
  }
});

class Contact extends Component {
  state = {};

  componentDidMount = () => {
    axios
      .get(`https://superkamos.cz/api/?rest_route=/wp/v2/pages/206`)
      .then(res => {
        if (res && res.data && res.data.acf) {
          const mainPageInfo = res.data.acf;
          this.setState({ mainPageInfo });
        }
      });
  };

  componentDidUpdate() {
    let hash = this.props.location.hash.replace("#", "");
    if (hash) {
      let node = ReactDOM.findDOMNode(this.refs[hash]);
      if (node) {
        node.scrollIntoView();
      }
    }
  }

  sendMsgToApi = () => {
    axios
      .post(`https://superkamos.cz/api/?rest_route=/test/test2`, {
        msg: this.state.msg,
        email: this.state.email
      })
      .then(res => {
        this.setState({ open: true, msg: "", email: "" });
      });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes, rootClass } = this.props;
    const { mainPageInfo } = this.state;
    return (
      <React.Fragment>
        <div className={rootClass + " containerWidth"}>
          <Paper className={classes.mainContact}>
            <Typography variant="h5">
              <img className={"logo_bsd"} src={"/img/logo.png"} />
            </Typography>
            <Typography>
              {mainPageInfo && (
                <div
                  className="no-p-padding"
                  dangerouslySetInnerHTML={{
                    __html: mainPageInfo.contact
                  }}
                />
              )}
            </Typography>
            <Typography>
              <br />
              <strong>Adresa:</strong>
              <br />
              <strong>Barevný svět dětí, z. s.</strong>
              <br />
              Pod Nuselskými schody 1721/3, Praha 2, 120 00
              <br />
            </Typography>
          </Paper>

          <Paper style={{ height: "300px", width: "100%", marginTop: 30 }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyCBCc92bVgH89pisQW6RheSVv_mHDvKPt0"
              }}
              defaultCenter={{ lat: 50.068777, lng: 14.435769 }}
              defaultZoom={17}
            >
              <MapReactComponent
                lat={50.068777}
                lng={14.435769}
                text={"Barevný svět dětí"}
              />
            </GoogleMapReact>
          </Paper>

          <Paper className={classes.contactForm}>
            <div style={{ width: "270px" }}>
              <TextField
                placeholder="Váš email"
                value={this.state.email}
                onChange={this.handleChange("email")}
                className={classes.textField}
                variant="outlined"
                color="inherit"
              />
            </div>
            <div>
              <TextField
                id="outlined-textarea"
                label="Vaše zpráva"
                value={this.state.msg}
                multiline
                rows="5"
                onChange={this.handleChange("msg")}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                color="inherit"
              />
              <Button
                className={classes.button}
                onClick={() => this.sendMsgToApi()}
                variant="contained"
              >
                Odeslat
              </Button>
            </div>
            <div style={{ clear: "both" }} />
          </Paper>
        </div>
        <FooterFriends rootClass={classes.root} mainPageInfo={mainPageInfo} />
        <ScrollButton scrollStepInPx="50" delayInMs="16.66" />
        <DirectionSnackbar
          handleClose={this.handleClose}
          open={this.state.open}
        />
      </React.Fragment>
    );
  }
}

const MapReactComponent = ({ text }) => (
  <div
    style={{
      background: "white",
      padding: "5px",
      width: 50,
      boxShadow:
        "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)"
    }}
  >
    {text}
  </div>
);

export default withRouter(withStyles(styles)(Contact));
//AIzaSyCBCc92bVgH89pisQW6RheSVv_mHDvKPt0
