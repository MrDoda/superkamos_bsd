import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  withStyles,
  Grid,
  Typography,
  Paper,
  Tooltip
} from "@material-ui/core";
import { withRouter } from "react-router";
import { getImg } from "./Friends";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  icon: {
    color: "rgb(34, 161, 238)",
    float: "right"
  }
});

class Partners extends Component {
  state = {};

  componentDidMount = () => {};

  componentDidUpdate() {
    let hash = this.props.location.hash.replace("#", "");
    if (hash) {
      let node = ReactDOM.findDOMNode(this.refs[hash]);
      if (node) {
        node.scrollIntoView();
      }
    }
  }

  render() {
    const { classes, rootClass, history, partnersData, media } = this.props;
    return (
      <div ref="partneri" className={rootClass + " containerWidth"}>
        <Typography
          variant="h4"
          style={{ marginBottom: "50px", textAlign: "center" }}
        >
          <span style={{ fontWeight: 800, color: "#F39C12" }}>DĚKUJEME</span>
        </Typography>
        <Paper>
          <Grid
            cellHeight={300}
            spacing={24}
            className={"text-align-center"}
            cols={6}
            container
            alignItems={"center"}
          >
            {Array.isArray(partnersData) &&
              partnersData.map((partner, index) => {
                return (
                  <Grid style={{ margin: "auto" }} item key={partner.id}>
                    <Tooltip
                      placement="top"
                      title={
                        partner.content.rendered &&
                        partner.content.rendered.length > 3 && (
                          <Typography
                            style={{ color: "white" }}
                            dangerouslySetInnerHTML={{
                              __html: partner.content.rendered
                            }}
                          />
                        )
                      }
                    >
                      <div
                        className="text-partneru"
                        onClick={() =>
                          partner.acf.url
                            ? window.location.replace(partner.acf.url)
                            : console.log("clicked on partner")
                        }
                      >
                        <img
                          className="imgUrlPartneri"
                          src={getImg(partner.featured_media, media)}
                        />
                      </div>
                    </Tooltip>
                  </Grid>
                );
              })}
          </Grid>
        </Paper>
      </div>
    );
  }
}

export function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default withRouter(withStyles(styles)(Partners));
