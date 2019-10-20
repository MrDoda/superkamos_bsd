import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button, withStyles, Grid, Typography, Paper } from "@material-ui/core";
import { withRouter } from "react-router";

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

class Friends extends Component {
  state = {
    friendsData: [],
    showAll: false,
    width: 1200,
    height: 1200
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };
  componentDidMount = () => {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
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

  render() {
    const { classes, rootClass, history, media } = this.props;
    let { friendsData } = this.props;
    const { width } = this.state;

    return (
      <div ref="kamosi" className={rootClass + " containerWidth"}>
        <Typography
          variant="h4"
          style={{ marginBottom: "36px", textAlign: "center" }}
        >
          Dvojice{" "}
          <span style={{ color: "#F39C12", fontWeight: 800 }}>kámošů</span>
        </Typography>
        <div className="friends_info containerWidth">
          <div className={"obdelnik " + "gold"}>Superkámoš</div>
          <div className={"obdelnik " + "silver"}> Sponzor </div>
          <div className={"obdelnik " + "whitesmoke"}> Bez sponzora </div>
        </div>
        <Grid cellHeight={300} spacing={24} cols={3} container>
          {Array.isArray(friendsData) &&
            friendsData.map((friend, index) => {
              if (!this.state.showAll) {
                if (width <= 768) {
                  if (index > 2) {
                    return "";
                  }
                } else {
                  if (index > 8) {
                    return "";
                  }
                }
              }
              return (
                <Grid style={{ margin: "auto" }} item key={friend.id}>
                  <Paper
                    className="text-kamosu"
                    onClick={() =>
                      history.push("kamos/" + friend.id + "#header")
                    }
                  >
                    <img
                      className={
                        "imgUrlKamosi " + getFriendColor(friend.acf.super_kamos)
                      }
                      src={getImg(friend.featured_media, media)}
                    />

                    <Typography variant="h6">
                      {friend.title.rendered}
                    </Typography>
                  </Paper>
                </Grid>
              );
            })}
        </Grid>
        {!this.state.showAll && (
          <div style={{ width: "100%", textAlign: "center" }}>
            <Button
              style={{
                backgroundColor: "#ffffff",
                margin: "auto",
                marginTop: "20px"
              }}
              variant="contained"
              onClick={() => {
                this.setState({ showAll: true });
              }}
            >
              {" "}
              Zobrazit vše{" "}
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export function getImg(id, media) {
  if (id && media) {
    const foundMedia = media.find(m => m.id == id);
    if (foundMedia) {
      return foundMedia.source_url;
    } else {
      return "/img/default.jpg";
    }
  }
}

export function getFriendColor(id) {
  if (id == 1) {
    return "silver-border";
  }
  if (id == 2) {
    return "gold-border";
  }
  return "white-border";
}

export function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default withRouter(withStyles(styles)(Friends));
