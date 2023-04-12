/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect, useRef } from "react";
import { Control, Controller } from "react-hook-form";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useStyles } from "./CustomSelectStyle";
import FormHelperText from "@mui/material/FormHelperText";
import clsx from "clsx";
import CloseIcon from "@mui/icons-material/Close";

const SelectForm = ({
  label,
  value,
  options,
  props,
  disabled = false,
  errors,
  errorMessage,
  required,
  name,
  control,
  helperText,
  messageRequired,
  size = "medium",
  fullWidth = false,
  widthContainer = '100%',
  heightContainer = '100%',
  fontSize = '16px',
  variant = 'outlined',
  labelRequired = false,
  showLabel = true,
}) => {
  const defaultMessage = "Đây là trường bắt buộc";
  let valueErrors = {};
  let keyErrors = "";
  for (const k in errors) {
    if (k === name) {
      valueErrors = errors[k];
      keyErrors = k;
    }
  }

  const handleErrors = valueErrors
    ? [{ path: keyErrors, message: valueErrors?.message }]
    : "";

  const styles = useStyles();
  const [data, setData] = useState(value || null);
  const [reSize, setReSize] = useState(0);
  const [width, setWidth] = useState(0);
  const [isShowLabel, setIsShowLabel] = useState(true);
  const selectRef = useRef();
  useEffect(() => {
    const listener = () => {
      setTimeout(() => {
        setReSize(window.innerWidth);
      }, 1000);
    };

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);
  useEffect(() => {
    setWidth(selectRef && selectRef.current?.offsetWidth - 38);
  }, [reSize]);

  return (
    <FormControl
      fullWidth={fullWidth}
      error={
        handleErrors && !data && handleErrors.some((e) => e?.path === name)
      }
      variant={variant}
      size={size}
      sx={{
        width: widthContainer,
        height: heightContainer
      }}
    >
      <Controller
        name={name}
        control={control}
        rules={{
          required: required
            ? messageRequired
              ? messageRequired
              : defaultMessage
            : false,
        }}
        render={({ field: { onChange, onBlur, value } }) => {
          // set margin paper when have value
          const getMenuProps = (selectRef) => {
            return {
              PaperProps: {
                style: {
                  width: selectRef.current?.offsetWidth,
                  marginLeft: value ? "33px" : "0px",
                },
              },
            };
          };
          return (
            <>
              {isShowLabel && (
                <InputLabel
                  required={labelRequired}
                  sx={{ color: "#333 !important", fontSize: fontSize }}
                  className={clsx(styles.required, styles.labelField)}
                >
                  {label}
                </InputLabel>
              )}
              <Select
                variant="outlined"
                sx={{
                  background: disabled ? "#F7F7F7 !important" : "",
                  "& >div": {
                    color: "#2C2C2C",
                    WebkitTextFillColor: "unset !important",
                  },
                }}
                onChange={(e) => {
                  onChange(e);
                  setIsShowLabel(showLabel);
                  setData(value);
                }}
                onBlur={onBlur}
                value={value || ""}
                disabled={disabled}
                label={isShowLabel ? label : ""}
                error={
                  handleErrors &&
                  !data &&
                  handleErrors.some((e) => e?.path === name)
                }
                ref={selectRef}
                endAdornment={
                  value && !disabled ? (
                    <InputAdornment
                      position="end"
                      sx={{ paddingRight: "12px" }}
                    >
                      <IconButton onClick={onChange}>
                        <CloseIcon sx={{ fontSize: fontSize }} />
                      </IconButton>
                    </InputAdornment>
                  ) : null
                }
                // set style for paper
                MenuProps={getMenuProps(selectRef)}
                {...props}
              >
                {options &&
                  options.map((option, index) => (
                    <MenuItem key={option.value} value={option.value}>
                      <Typography
                        sx={{
                          width: width,
                          whiteSpace: "initial",
                          fontSize: fontSize,
                        }}
                      >
                        {option.label}
                      </Typography>
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText
                sx={{
                  color: "red !important",
                  fontFamily: "Inter Regular",
                  fontSize: 13,
                }}
              >
                {handleErrors &&
                  !data &&
                  handleErrors.some((e) => e?.path === name)
                  ? handleErrors?.find((e) => e?.path === name)?.message
                  : helperText
                    ? helperText
                    : ""}
              </FormHelperText>
            </>
          );
        }}
      />
    </FormControl>
  );
};

export default SelectForm;
