import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    selectWrapper: {
      boxShadow: "none",
      "& .MuiSelect-filled.Mui-disabled": {
        background: "#F7F7F7 !important",
      },
      "& .MuiSelect-outlined.Mui-disabled": {
        background: "#F7F7F7 !important",
      },
      "& .MuiFormControl-root": {
        background: "#F4F5FA!important",
        width: "100%",
        margin: "0px",
        borderRadius: "5px !important",
        border: "1px solid #e0e0e0",

        "&:hover, &:focus": {
          // border: `1px solid ${Colors.blue}`,
        },
        "& .MuiOutlinedInput-notchedOutline": {
          display: "none",
        },
      },
      "& .MuiInputLabel-root:hover": {
        color: "#000",
      },
      "& .Mui-focused": {
        color: "#000 !important",
        // paddingRight: "12px",
        borderBottom: "none !important",
      },
      "& .MuiSelect-select": {
        background: "#fff !important",
        borderRadius: "5px !important",
        padding: "15.3px 10px",
      },
      "& .MuiFilledInput-root::before": {
        borderBottom: "none",
      },
      "& .MuiFilledInput-root:hover::before": {
        borderBottom: "none !important",
      },
      "& .MuiFilledInput-root::after": {
        borderBottom: "none !important",
      },
      "& .MuiFilledInput-root.MuiFilledInput-underline:before": {
        display: "none !important",
      },
      "& .MuiSelect-select.MuiSelect-filled": {
        paddingTop: "17px",
        minHeight: "2.2em",
      },
      "& .MuiOutlinedInput-root>fieldset.MuiOutlinedInput-notchedOutline": {
        border: "1px solid #b9b9b9 !important",
        // display: "unset !important",
      },
      "& .Mui-disabled>fieldset": {
        border: "1px solid #b9b9b9 !important",
        display: "unset !important",
      },

      "& .Mui-disabled .MuiOutlinedInput-notchedOutline > legend": {
        float: "unset",
        overflow: "hidden",
        display: "block",
        padding: 0,
        height: "11px",
        fontSize: "0.75em",
        visibility: "hidden",
        maxWidth: "100%",
        width: "56px",
      },
    },
    selectRoot: {
      background: "#F4F5FA!important",
      border: "none !important",

      width: "100%",
      margin: "0px",
      borderRadius: "5px !important",
      // border: "1px solid rgba(0, 0, 0, 0.23)!important",
      "& .MuiInputBase-root.MuiOutlinedInput-root": {
        border: "solid 1px #c6c6c6 !important",
      },
      "& .MuiInputBase-root.MuiOutlinedInput-root.Mui-disabled": {
        border: "none !important",
      },
      "&:hover, &:focus": {
        border: `1px solid #007fff`,
      },
      "& .MuiOutlinedInput-notchedOutline": {
        display: "none",
      },
    },
    selectRootError: {
      background: "#F4F5FA!important",
      width: "100%",
      margin: "0px",
      borderRadius: "5px !important",
      border: "1px solid red !important",

      "&:hover, &:focus": {
        border: `1px solid #007fff`,
      },
      "& .MuiOutlinedInput-notchedOutline": {
        display: "none",
      },
      "& .MuiFormControl-root > label": {
        color: "#000 !important",
      },
    },
    required: {
      paddingLeft: "3px",
      "& .MuiFormLabel-asterisk": {
        color: "red !important",
        fontSize: "15px !important",
      },
    },
    dropdownStyle: {
      // minWidth: "200px !important",
      // "& .MuiMenuItem-root": {
      //     width: "400px",
      //     "& .MuiTypography-root": {
      //         whiteSpace: "normal",
      //         wordWrap: "break-word",
      //     }
      // }
    },
    label: {
      backgroundColor: "transparent",
      "& .MuiSelect-outlined.Mui-disabled": {
        background: "#F7F7F7 !important",
      },
    },
    labelField: {
      "&.shrink": {
        transform: "translate(14px, -9px) scale(0.9)",
      },
    },
  })
);
