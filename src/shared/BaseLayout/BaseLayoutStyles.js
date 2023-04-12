import { createStyles, makeStyles } from "@mui/styles";
export const BaseLayoutStyles = makeStyles(() =>
  createStyles({
    Container: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItem: "center",
      "@media screen and (min-width: 0px) and (max-width:640px)": {
        paddingLeft: "0px !important",
        paddingRight: "0px !important",
      },
    },
    BoxContainer: {
      width: "48rem",
      height: "90%",
      margin: "0 auto",
      boxSizing: "border-box",
      "@media screen and (min-width: 0px) and (max-width:640px)": {
        width: "100%",
        height: "100%",
        overflowX: "hidden",
      },
      "@media screen and (min-width: 640px)": {
        width: "48rem",
        height: "97%",
        paddingTop: "2rem",
      },
    },
    BoxBody: {
      position: "relative",
      // marginTop: "2rem",
      marginBottom: "2rem",
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderRadius: "14px",
      backgroundColor: "white",
      overflowX: "hidden",
      overflowY: "auto",
      boxShadow:
        "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
      "@media screen and (min-width: 0px) and (max-width:640px)": {
        marginTop: "0",
        marginBottom: "0",
        borderRadius: "0",
      },
      "@media screen and (min-width: 640px)": {
        marginBottom: "2rem",
        borderRadius: "14px",
      },
    },
  })
);
