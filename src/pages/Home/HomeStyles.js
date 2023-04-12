import { createStyles, makeStyles } from "@mui/styles";
export const HomeStyles = makeStyles(() =>
  createStyles({
    BoxHeaderContent: {
      width: "100%",
    },
    HeaderContent: {
      width: "100%",
      padding: "10px",
      boxSizing: "border-box",
    },
    HeaderInfo: {
      width: "95%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "1.25rem",
      marginBottom: "1.875rem",
      marginLeft: "0.625rem",
      marginRight: "0.625rem",
      "& >div >img": {
        width: "200px",
        height: "120px",
      },
      "& >div > img": {
        "@media screen and (min-width: 0px) and (max-width:640px)": {
          margin: "15px 0px",
          width: "140px",
          height: "90px",
        },
      },
    },
    BoxBodyContent: {
      background:
        "linear-gradient(90deg, rgba(18,173,232,1) 0%, rgba(81,140,246,1) 0%, rgba(0,212,255,0.7483368347338936) 100%)",
      width: "100%",
      borderTopLeftRadius: "12px",
      borderTopRightRadius: "12px",
      "@media screen and (min-width: 0px) and (max-width:640px)": {
        borderTopLeftRadius: "0",
        borderTopRightRadius: "0",
      },
    },
    FooterContainer: {
      position: "relative",
      top: "-15px",
      left: "0",
      backgroundColor: "white",
      width: "100%",
      height: "50%",
      borderRadius: "14px",
      boxSizing: "border-box",
      padding: "15px 15px 50px",
    },
    FooterContent: {
      display: "flex",
      flexWrap: "wrap",
      gap: "15px",
      width: "100%",
    },
    FooterCategory: {
      "& >div": {
        "@media screen and (min-width: 0px) and (max-width:640px)": {
          padding: "0px",
        },
      },
    },
    CardContent: {
      display: "flex",
      flex: "1 1",
      alignItems: "center",
      justifyContent: "center",
      padding: "18px 15px",
      boxShadow: "none !important",
      borderRadius: "14px !important",
      backgroundColor: "rgb(72, 186, 251) !important",
      "&:hover ": {
        backgroundColor: "rgb(81, 143, 246) !important",
        cursor: "pointer",
      },
    },
    CategoryContent: {
      width: "3.5rem !important",
      height: "3.5rem !important",
      backgroundColor: "antiquewhite",
      margin: "0 auto",
    },
    CategoryBox: {
      // background: 'rgba(18,173,232,1)',
      borderRadius: "30px",
      padding: "10px 0px",
    },
    CategoryGrid: {
      "&:hover ": {
        cursor: "pointer",
        background: "rgba(0,30,108,.03)",
        borderRadius: "14px",
      },
    },
    SearchContainer: {
      display: "flex",
      width: "92%",
      backgroundColor: "#fff",
      borderRadius: "35px",
      marginLeft: "8px",
      marginRight: "12px",
      height: "42px",
      cursor: "pointer",
    },
    SearchAddress: {
      background: "none !important",
      outline: "none",
      position: "relative",
      // borderBottomRightRadius: '5px',
      // borderTopRightRadius: '5px'
    },
    LabelAddress: {
      position: "relative",
      top: "13px",
      left: "12px",
      "@media screen and (min-width: 0px) and (max-width:640px)": {
        whiteSpace: "nowrap",
        width: "250px",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    Accordion: {
      boxShadow: "none !important",
      background: "#f6f9fc !important",
    },
    FooterNearLocation: {},
    NeLoBox: {
      display: "flex",
      flexDirection: "row",
      borderRadius: "14px",
      paddingBottom: "25px",
    },
  })
);
