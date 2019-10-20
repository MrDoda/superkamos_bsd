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
        console.log(res);
      });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes, rootClass } = this.props;
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
                Co znamená stát se
                <span
                  style={{ fontWeight: 800, marginLeft: 10, color: "#F39C12" }}
                >
                  Superkámošem
                </span>
                <span
                  style={{
                    color: "#F39C12"
                  }}
                >
                  ?
                </span>
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography className="expandedText">
                Stát se SUPERkámošem znamená <strong>finančně podpořit</strong>{" "}
                asistenta a dítě zapojené v projektu Kámoš. Potřebná částka na{" "}
                <strong>fungování konkrétní dvojice</strong> po dobu jednoho
                roku je 42 000 Kč.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel className="marginTop10">
            <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
              <Typography variant="h6" className="expandedText">
                Co se za projektem Kámoš skrývá
                <span>?</span>
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography className="expandedText">
                Projekt Kámoš pomáhá ohroženým dětem a jejich rodinám již{" "}
                <strong>od roku 2005</strong>.<br />
                Děti = malí Kámoši se v rámci projektu pravidelně setkávají s
                osobními asistenty,
                <br />
                velkými Kámoši.
                <br />
                <br />
                <strong>
                  Úlohou asistenta je být malému Kámoši oporou, vzorem,
                  zpovědníkem, motivací a hlavně kamarádem, na kterého se může
                  spolehnout.{" "}
                </strong>
                <br />
                <br />
                Zároveň dospělí členové rodiny mají možnost využít služeb
                sociálního pracovníka, psychologa, terapeuta, právníka,
                finančního poradce, mediátora či služby kariérního poradce.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel className="marginTop10">
            <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
              <Typography variant="h6" className={classes.heading}>
                Komu můj příspěvek pomůže a jak
                <span>?</span>
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography className="expandedText">
                Váš příspěvek v první řadě
                <strong>podpoří práci osobního asistenta s dítětem.</strong>
                <br />A dle potřeby nám také umožní pracovat s celou rodinou.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel className="marginTop10">
            <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
              <Typography variant="h6" className={classes.heading}>
                Jak bude vše probíhat
                <span>?</span>
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography className="expandedText" />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel className="marginTop10">
            <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
              <Typography variant="h6" className={classes.heading}>
                Co za to dostanu ?
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography className="expandedText">
                <span style={{ fontWeight: 800 }}>Superkámoš</span> pravidelně
                2x za rok (v lednu a v červnu) obdrží zprávu o činosti kámošské
                dvojice. Ostatní sponzoři dostanou zprávu na konci školního
                roku. <br />
                <br />
                <strong>
                  Každý kdo přispěje bude mít uvedeno na webu logo
                </strong>{" "}
                či jméno a motto, které vás vedlo k podpoření kámošské dvojice.
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
                <strong>Mgr. Cesneková Zuzana</strong>, Předsedkyně spolku,
                fundraising,
                <br />
                <a href="mailto:cesnekova@barevnysvetdeti.cz">
                  cesnekova@barevnysvetdeti.cz
                </a>
                , <a href="tel:732857225">731 850 775</a>
                <br />
                <br />
                <strong>Bc. Bradáčová Veronika</strong>, Sociální pracovník
                projektu,
                <br />
                <a href="mailto:bradacova@barevnysvetdeti.cz">
                  bradacova@barevnysvetdeti.cz
                </a>
                , <a href="tel:725945135">725 945 135</a>
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
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Friends));
