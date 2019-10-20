import React from "react";
import Slider from "react-slick";
import {
  Grid,
  withStyles,
  Button,
  CardContent,
  Card,
  Typography,
  CardActions
} from "@material-ui/core";
import { getSliderData } from "../store";

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: "100%",
    marginTop: 24
    //overflowX: "hidden"
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  slide: {
    height: 600,
    width: "100%",
    display: "inline-block"
  },
  slideImg: {
    backgroundRepeat: "no-repeat",
    backgroundAttachement: "fixed",
    backgroundPosition: "center",
    backgroundSize: "100% auto",
    width: "100%",
    height: "575px",
    display: "inline-block"
  },
  card: {
    position: "absolute",
    bottom: 48,
    margin: 24,
    background: "#ffffffeb",
    maxWidth: "80%"
  },
  "@media (max-width: 905px)": {
    card: {
      position: "static",
      maxWidth: "auto"
    },
    slide: {
      height: "auto",
      backgroundPosition: "top",
      width: "100%",
      display: "inline-block"
    },
    slideImg: {
      height: "375px"
    }
  }
});

class SimpleSlider extends React.Component {
  state = {
    sliderData: [1, 2, 3]
  };
  componentDidMount = () => {
    this.setState({ sliderData: getSliderData() });
  };

  render() {
    const { classes } = this.props;
    const { sliderData } = this.state;
    const settings = {
      dots: false,
      arrows: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2500,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className={classes.root}>
        <Slider {...settings}>
          {sliderData.map(item => (
            <div className={classes.slide}>
              <CarouselItem classes={classes} item={item} />
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

function CarouselItem({ item, classes }) {
  const { imgUrl, title, slogan, url } = item;
  return (
    <React.Fragment>
      <span
        className={classes.slideImg}
        style={{ backgroundImage: `url('${imgUrl}')` }}
      >
        <Card className={classes.card}>
          {title && (
            <CardContent>
              <Typography variant="h5" component="h2">
                {title}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {slogan}
              </Typography>
            </CardContent>
          )}
          {url && (
            <CardActions>
              <Button size="small" to={url}>
                Více informací
              </Button>
            </CardActions>
          )}
        </Card>
      </span>
    </React.Fragment>
  );
}

export default withStyles(styles)(SimpleSlider);
