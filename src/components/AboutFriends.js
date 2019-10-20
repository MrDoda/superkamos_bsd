import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  withStyles,
  Grid,
  Typography,
  ExpansionPanelSummary,
  ExpansionPanel,
  ExpansionPanelDetails,
  Icon
} from "@material-ui/core";
import { withRouter } from "react-router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import DirectionSnackbar from "./MessageSent";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5
  },
  button: {
    float: "right"
  }
});

class Friends extends Component {
  state = {
    msg: "",
    email: ""
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
    const { classes, rootClass, mainPageInfo } = this.props;
    return (
      <div ref="superkamos" className={rootClass + " containerWidth"}>
        <Grid spacing={24} className={classes.gridList} cols={3}>
          <Typography
            variant="h4"
            style={{ marginBottom: "36px", textAlign: "center" }}
          >
            Jak se stát
            <span style={{ fontWeight: 800, marginLeft: 10, color: "#F39C12" }}>
              Superkámošem
            </span>
            <span style={{ color: "#F39C12" }}>?</span>
          </Typography>
          <ExpansionPanel className="marginTop10">
            <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
              <Typography variant="h6" className={classes.heading}>
                {mainPageInfo && (
                  <div
                    className="no-p-padding"
                    dangerouslySetInnerHTML={{
                      __html: mainPageInfo.gfaq1_heading
                    }}
                  />
                )}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography className="expandedText">
                {mainPageInfo && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: mainPageInfo.gfaq1_text
                    }}
                  />
                )}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel className="marginTop10">
            <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
              <Typography variant="h6" className="expandedText">
                {mainPageInfo && (
                  <div
                    className="no-p-padding"
                    dangerouslySetInnerHTML={{
                      __html: mainPageInfo.gfaq2_heading
                    }}
                  />
                )}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography className="expandedText">
                {mainPageInfo && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: mainPageInfo.gfaq2_text
                    }}
                  />
                )}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel className="marginTop10">
            <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
              <Typography variant="h6" className={classes.heading}>
                {mainPageInfo && (
                  <div
                    className="no-p-padding"
                    dangerouslySetInnerHTML={{
                      __html: mainPageInfo.gfaq3_heading
                    }}
                  />
                )}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {mainPageInfo && (
                <div
                  dangerouslySetInnerHTML={{ __html: mainPageInfo.gfaq3_text }}
                />
              )}
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel className="marginTop10">
            <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
              <Typography variant="h6" className={classes.heading}>
                {mainPageInfo && (
                  <div
                    className="no-p-padding"
                    dangerouslySetInnerHTML={{
                      __html: mainPageInfo.gfaq4_heading
                    }}
                  />
                )}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography className="expandedText">
                {mainPageInfo && (
                  <div
                    className="no-p-padding"
                    dangerouslySetInnerHTML={{
                      __html: mainPageInfo.gfaq4_text
                    }}
                  />
                )}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel className="marginTop10">
            <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
              <Typography variant="h6" className={classes.heading}>
                {mainPageInfo && (
                  <div
                    className="no-p-padding"
                    dangerouslySetInnerHTML={{
                      __html: mainPageInfo.gfaq5_heading
                    }}
                  />
                )}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography className="expandedText">
                {mainPageInfo && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: mainPageInfo.gfaq5_text
                    }}
                  />
                )}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            className="marginTop10"
            style={{ backgroundColor: "#F39C12", color: "#fff" }}
            color={"white"}
          >
            <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
              <Typography
                variant="h6"
                style={{ color: "#fff" }}
                className={classes.heading}
              >
                Potřebuji více informací. Na koho se mohu obrátit? {" "}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography style={{ color: "#fff" }} className="expandedText">
                {mainPageInfo && (
                  <div
                    className="no-p-padding"
                    dangerouslySetInnerHTML={{
                      __html: mainPageInfo.contact
                    }}
                  />
                )}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            className="marginTop10"
            style={{ backgroundColor: "#F39C12", color: "#fff" }}
            color={"white"}
          >
            <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
              <Typography
                variant="h6"
                style={{ color: "#fff" }}
                className={classes.heading}
              >
                Zaujal Vás tento projekt a rádi byste ho podpořili?{" "}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div style={{ width: "100%" }}>
                <div style={{ width: "270px" }}>
                  <TextField
                    placeholder="Váš email"
                    value={this.state.email}
                    onChange={this.handleChange("email")}
                    className={classes.textField}
                    variant="outlined"
                    color="secondary"
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-textarea"
                    placeholder="Vaše zpráva"
                    value={this.state.msg}
                    multiline
                    rows="5"
                    onChange={this.handleChange("msg")}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    color="secondary"
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
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
        <DirectionSnackbar
          handleClose={this.handleClose}
          open={this.state.open}
        />
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Friends));
