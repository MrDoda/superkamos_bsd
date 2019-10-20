import React, { Component } from "react";
import PropTypes from "prop-types";
import { Paper, withStyles } from "@material-ui/core";
import { withRouter } from "react-router";

const styles = {};

export class HomeContent extends Component {
    render() {
        const { classes, rootClass } = this.props;
        return;
    }
}

export default withRouter(withStyles(styles)(HomeContent));
