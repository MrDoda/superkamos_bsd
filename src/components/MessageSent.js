import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

export default function DirectionSnackbar({ open, handleClose }) {
  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      TransitionComponent={TransitionRight}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
    >
      <span
        style={{
          background: "#34d239",
          padding: 20,
          borderRadius: "15px",
          marginBottom: "100px",
          color: "#292929 !important",
          fontWeight: "800"
        }}
      >
        Zpráva odeslána! :-)
      </span>
    </Snackbar>
  );
}
