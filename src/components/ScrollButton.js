import React from "react";
import { Button, Icon } from "@material-ui/core";

class ScrollButton extends React.Component {
    constructor() {
        super();

        this.state = {
            intervalId: 0,
            inProcess: false,
        };
    }

    scrollStep() {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
            this.setState({ inProcess: false, intervalId: 0 })
        }
        window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
    }

    scrollToTop() {
        if (!this.state.inProcess) {
            let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
            this.setState({ intervalId: intervalId, inProcess: true, });
        }
    }

    render() {
        return <button title='Zpět k hlavičce stránky' className='scroll'
            onClick={() => { this.scrollToTop(); }}>
            <span className=''><Icon>keyboard_arrow_up</Icon></span>
        </button>;
    }
}

export default (ScrollButton);