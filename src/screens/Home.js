import React, { Component } from "react";
import SimpleSlider from "../components/Slider";
import { withStyles } from "@material-ui/core";
import Friends from "../components/Friends";
import AboutFriends from "../components/AboutFriends";
import Partners from "../components/Partners";
import FooterFriends from "../components/FooterFriends";
import ScrollButton from "../components/ScrollButton";
import axios from "axios";

const styles = {
  root: {
    flexGrow: 1,
    padding: 24,
    margin: 24
  }
};

class Home extends Component {
  state = {};
  componentDidMount = () => {
    axios.get(`http://superkamos.cz/api/?rest_route=/wp/v2/media`).then(res => {
      const media = res.data;
      this.setState({ media });
    });

    axios
      .get(`http://superkamos.cz/api/?rest_route=/wp/v2/friends`)
      .then(res => {
        const friendsData = res.data;
        this.setState({ friendsData });
      });
    axios
      .get(`http://superkamos.cz/api/?rest_route=/wp/v2/partners`)
      .then(res => {
        const partnersData = res.data;
        this.setState({ partnersData });
      });
  };
  render() {
    const { classes } = this.props;
    const { friendsData, media, partnersData } = this.state;
    return (
      <div>
        <SimpleSlider />
        <AboutFriends rootClass={classes.root} />
        <Friends
          rootClass={classes.root}
          friendsData={friendsData}
          media={media}
        />
        <Partners
          rootClass={classes.root}
          partnersData={partnersData}
          media={media}
        />
        <FooterFriends rootClass={classes.root} media={media} />
        <ScrollButton scrollStepInPx="50" delayInMs="16.66" />
      </div>
    );
  }
}

export default withStyles(styles)(Home);
