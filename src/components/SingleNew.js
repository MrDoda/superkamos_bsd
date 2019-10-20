import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Typography, withStyles } from "@material-ui/core";
import { withRouter } from "react-router";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import ScrollButton from "./ScrollButton";
import FooterFriends from "./FooterFriends";
import { getImg } from "./Friends";
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

  componentDidMount = () => {
    const { match } = this.props;

    axios.get(`http://superkamos.cz/api/?rest_route=/wp/v2/media`).then(res => {
      const media = res.data;
      this.setState({ media });
    });
    axios
      .get(
        `http://superkamos.cz/api/?rest_route=/wp/v2/posts/${match.params.id}`
      )
      .then(res => {
        const post = res.data;
        this.setState({ post });
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
                  src={getImg(post.featured_media, media)}
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
        <FooterFriends rootClass={classes.root} media={media} />
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
