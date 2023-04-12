import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { LoadingStyles } from "./LoadingStyle.jsx";
import { Box } from "@mui/material";

function Loading(props) {
  const classes = LoadingStyles();
  const { isLoading } = props;
  if (isLoading) {
    return (
      <Box className={classes.BoxLoading}>
        <CircularProgress disableShrink className={classes.LoadingIcon} />
      </Box>
    );
  }
}

export default Loading;
