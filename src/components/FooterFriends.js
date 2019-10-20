import React, { Component } from "react";
import {
  withStyles,
  Grid,
  Typography,
  Divider,
  List,
  ListItem,
  Avatar,
  ListItemText
} from "@material-ui/core";
import { withRouter } from "react-router";
import { SocialIcon } from "react-social-icons";
import dateformat from "dateformat";
import axios from "axios";

const styles = theme => ({});

class FooterFriends extends Component {
  state = {
    news: []
  };

  componentDidMount() {
    axios
      .get(`https://superkamos.cz/api/?rest_route=/wp/v2/posts`)
      .then(res => {
        const news = res.data;
        this.setState({ news });
      });
  }

  render() {
    const { classes, history, mainPageInfo } = this.props;
    const { news } = this.state;
    return (
      <React.Fragment>
        <Divider style={{ marginTop: 50 }} />
        <div
          className="footer-back"
          style={{
            position: "relative",
            backgroundImage: "url(/img/gallery_front.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% auto",
            backgroundColor: "#fff"
          }}
        >
          <div className="inside-back" />
          <Grid spacing={24} container className="containerWidth">
            <Grid item sm={4} xs={12}>
              <div className="footer-col" style={{ paddingTop: 75 }}>
                <Typography
                  variant="h5"
                  style={{
                    position: "absolute",
                    marginTop: -50,
                    zIndex: 79999,
                    marginBottom: "20px"
                  }}
                >
                  Sledujte nás
                </Typography>
                <div style={{ marginBottom: "20px" }}>
                  <SocialIcon url="https://www.facebook.com/barevnysvetdetios" />
                  <SocialIcon
                    style={{ marginLeft: "10px" }}
                    url="https://www.instagram.com/barevnysvetdeti/"
                  />
                </div>
              </div>
            </Grid>
            <Grid item sm={4} xs={12}>
              <div className="footer-col" style={{ paddingTop: 75 }}>
                <Typography
                  variant="h5"
                  style={{
                    position: "absolute",
                    marginTop: -50,
                    marginBottom: "20px"
                  }}
                >
                  Novinky
                </Typography>
                <List style={{ margin: "auto" }} className={classes.root}>
                  {news.map((item, index) => {
                    if (index <= 2) {
                      return (
                        <ListItem
                          key={item.id}
                          className={"newsBottom"}
                          onClick={() => history.push("/novinka/" + item.id)}
                        >
                          <Avatar
                            src={
                              item.better_featured_image
                                ? item.better_featured_image.source_url
                                : "/img/default.jpg"
                            }
                          />
                          <ListItemText
                            primary={
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: item.title.rendered
                                }}
                              />
                            }
                            secondary={dateformat(item.date, "dd. mm. yyyy")}
                          />
                        </ListItem>
                      );
                    } else {
                      return "";
                    }
                  })}
                </List>
              </div>
            </Grid>
            <Grid item sm={4} xs={12} style={{ paddingTop: 75 }}>
              <div className="footer-col">
                <Typography
                  variant="h5"
                  style={{
                    position: "absolute",
                    marginTop: -50,
                    marginBottom: "50px",
                    textAlign: "center"
                  }}
                >
                  <img className={"logo_bsd"} src={"/img/logo.png"} />
                </Typography>
                <Typography
                  style={{
                    position: "absolute",
                    marginTop: 32,
                    marginBottom: "20px"
                  }}
                >
                  {mainPageInfo && (
                    <div
                      className="no-p-padding"
                      dangerouslySetInnerHTML={{
                        __html: mainPageInfo.contact
                      }}
                    />
                  )}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
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

export default withRouter(withStyles(styles)(FooterFriends));
