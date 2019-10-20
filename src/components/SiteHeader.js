import React, { Component } from "react";
import {
  withStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { getMenuData } from "../store";
import { withRouter } from "react-router";
import { HashLink as Link } from "react-router-hash-link";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  logo: {
    width: "217px",
    maxWidth: "100%",
    marginTop: "-22px"
  },
  showMobile: {
    display: "none"
  },
  "@media (max-width: 905px)": {
    hideMobile: {
      display: "none"
    },
    showMobile: {
      display: "block"
    }
  }
};

class SiteHeader extends Component {
  state = {
    menuData: [],
    anchorEl: null
  };
  componentDidMount = () => {
    this.setState({ menuData: getMenuData() });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, history } = this.props;
    const { push } = history;
    const { anchorEl, menuData } = this.state;
    const menu = [{}];
    return (
      <div className={classes.root}>
        <AppBar color="secondary" position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <Button
                onClick={() => {
                  push("/");
                }}
                style={{ padding: 0 }}
              >
                <img className={classes.logo} src={"/img/logo.png"} />
              </Button>
            </Typography>
            {menuData.map(menu => {
              if (menu.external === undefined) {
                return (
                  <Button
                    className={classes.hideMobile}
                    onClick={() => {
                      push(menu.url);
                    }}
                  >
                    {menu.text}
                  </Button>
                );
              } else {
                return (
                  <Button
                    className={classes.hideMobile}
                    onClick={() => {
                      window.location = menu.url;
                    }}
                  >
                    {menu.text}
                  </Button>
                );
              }
            })}
            <IconButton
              className={classes.showMobile}
              color="inherit"
              aria-label="Menu"
              onClick={this.handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem
                onClick={() => {
                  push("/");
                  this.handleClose();
                }}
              >
                Domů
              </MenuItem>
              {menuData.map(menu => (
                <MenuItem
                  onClick={() => {
                    this.handleClose();
                  }}
                >
                  {menu.external === undefined ? (
                    <Link to={menu.url}>{menu.text}</Link>
                  ) : (
                    <a href={menu.url}>{menu.text}</a>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(SiteHeader));
