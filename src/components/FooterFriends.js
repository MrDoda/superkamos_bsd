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
import { getImg } from "./Friends";

const styles = theme => ({});

class FooterFriends extends Component {
  state = {
    news: []
  };

  componentDidMount() {
    axios.get(`http://superkamos.cz/api/?rest_route=/wp/v2/posts`).then(res => {
      const news = res.data;
      console.log(news);
      this.setState({ news });
    });
  }

  render() {
    const { classes, history, media } = this.props;
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
                          onClick={() =>
                            history.push("novinka/" + item.id + "#header")
                          }
                        >
                          <Avatar src={getImg(item.featured_media, media)} />
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
                  <br />
                  <br />
                  <a href="https://www.barevnysvetdeti.cz/">
                    www.barevnysvetdeti.cz
                  </a>
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
