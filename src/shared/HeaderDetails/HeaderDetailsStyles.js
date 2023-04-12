import { createStyles, makeStyles } from "@mui/styles";
export const HeaderDetaillsStyle = makeStyles(() =>
  createStyles({
    HeaderContent: {
      width: "100%",
      padding: "10px",
      boxSizing: "border-box",
      boxShadow: '-1px 11px 24px -11px rgb(0 0 0 / 10%)'
    },
    SearchContainer: {
      display: "flex",
      width: "98%",
      backgroundColor: "#fff",
      borderRadius: "5px",
      marginLeft: "8px",
      marginRight: "12px",
      "& > .MuiInputBase-input": {
        background: "#fff",
        borderRadius: "5px",
      },
    },
    SearchAddress: {
      background: "none !important",
      outline: "none",
      position: "relative",
      borderBottomRightRadius: "5px",
      borderTopRightRadius: "5px",
    },
    FilterContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      background: '#f3f6f9',
      padding: '10px 0 10px 10px',
      borderRadius: '5px'
    }
  })
);
