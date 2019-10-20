import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Typography, withStyles } from "@material-ui/core";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
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
    float: "right"
  },
  contentHeader: {
    padding: "24px",
    marginTop: "30px"
  }
});

class Contact extends Component {
  state = {};

  componentDidMount = () => {
    const { match } = this.props;

    axios.get(`http://superkamos.cz/api/?rest_route=/wp/v2/media`).then(res => {
      const media = res.data;
      this.setState({ media });
    });
    axios
      .get(
        `http://superkamos.cz/api/?rest_route=/wp/v2/friends/${match.params.id}`
      )
      .then(res => {
        const post = res.data;
        this.setState({ post });
      });
    axios
      .get(`http://superkamos.cz/api/?rest_route=/wp/v2/pages/206`)
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
      .post(`http://superkamos.cz/api/?rest_route=/test/test2`, {
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
    const { post } = this.state;
    if (!post || !post.content) {
      return "";
    }

    return (
      <React.Fragment>
        <div ref={"header"} style={{ position: "absolute", top: 0 }} />
        <div className={rootClass + " containerWidth"}>
          <Paper className={classes.contentHeader}>
            <Typography variant={"h5"} component="h1">
              <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          </Paper>

          <Paper className={classes.contactForm}>
            <Typography variant={"h5"} component="h3">
              Více informací o dvojici:
              <br />
            </Typography>
            <br />
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
                color="secondary"
              >
                Odeslat
              </Button>
            </div>
            <div style={{ clear: "both" }} />
          </Paper>
        </div>
        <FooterFriends
          rootClass={classes.root}
          mainPageInfo={this.state.mainPageInfo}
        />
        <ScrollButton scrollStepInPx="50" delayInMs="16.66" />
        <DirectionSnackbar
          handleClose={this.handleClose}
          open={this.state.open}
        />
      </React.Fragment>
    );
  }
}

const AnyReactComponent = ({ text }) => (
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
