import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Typography, withStyles } from "@material-ui/core";
import { withRouter } from "react-router";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import ScrollButton from "./ScrollButton";
import FooterFriends from "./FooterFriends";
import Grid from "@material-ui/core/Grid";

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
  },
  contentHeader: {
    padding: "24px",
    marginTop: "30px"
  }
});

class Contact extends Component {
  state = {};

  componentDidMount() {
    const { match } = this.props;
    axios
      .get(
        `https://superkamos.cz/api/?rest_route=/wp/v2/posts/${match.params.id}`
      )
      .then(res => {
        const post = res.data;
        this.setState({ post });
      });

    axios
      .get(`https://superkamos.cz/api/?rest_route=/wp/v2/pages/206`)
      .then(res => {
        if (res && res.data && res.data.acf) {
          const mainPageInfo = res.data.acf;
          this.setState({ mainPageInfo });
        }
      });
  }

  componentDidUpdate(prevProps) {
    let hash = this.props.location.hash.replace("#", "");
    if (hash) {
      let node = ReactDOM.findDOMNode(this.refs[hash]);
      if (node) {
        node.scrollIntoView();
      }
    }
    const { match } = this.props;
    axios
      .get(
        `https://superkamos.cz/api/?rest_route=/wp/v2/posts/${match.params.id}`
      )
      .then(res => {
        const post = res.data;
        this.setState({ post });
      });
  }

  render() {
    const { classes, rootClass } = this.props;
    const { media, post } = this.state;
    if (!post || !post.content) {
      return "";
    }
    return (
      <React.Fragment>
        <div ref={"header"} style={{ position: "absolute", top: 0 }} />
        <div className={rootClass + " containerWidth"}>
          <Paper
            className={classes.contentHeader}
            style={{ minHeight: "calc( 100vh - 513px)" }}
          >
            <Grid container>
              <Grid item sm={4} xs={12}>
                <img
                  className="imgUrlKamosi"
                  src={
                    post.better_featured_image
                      ? post.better_featured_image.source_url
                      : "/img/default.jpg"
                  }
                />
              </Grid>
              <Grid item sm={8} xs={12}>
                <Typography variant={"h5"} component="h1">
                  <span
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                </Typography>
                <div
                  dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />
              </Grid>
            </Grid>
          </Paper>
        </div>
        <FooterFriends
          rootClass={classes.root}
          mainPageInfo={this.state.mainPageInfo}
        />
        <ScrollButton scrollStepInPx="50" delayInMs="16.66" />
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
