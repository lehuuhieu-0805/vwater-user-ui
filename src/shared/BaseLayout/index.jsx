import { Box, Container } from "@mui/material";
import React from "react";
import { BaseLayoutStyles } from "./BaseLayoutStyles";
import { Outlet } from "react-router-dom";
import './style.css';

export default function BaseLayout({ children }) {

  const classes = BaseLayoutStyles();

  return (
    <>
      <Container className={classes.Container}>
        <Box component={"div"} className={classes.BoxContainer}>
          <Box component={"div"} className={classes.BoxBody}>
            <Outlet />
          </Box>
        </Box>
      </Container>
    </>
  );
}
