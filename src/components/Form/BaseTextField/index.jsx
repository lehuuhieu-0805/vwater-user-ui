import React, { forwardRef, memo, useCallback, useMemo, useState } from "react";

import { styled } from "@mui/material/styles";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";

const TextFieldStyled = styled(TextField)`
  .MuiFilledInput-underline::after {
    content: none;
  }
  .MuiFilledInput-underline::before {
    content: none;
  }
  .MuiFilledInput-input {
    padding: 21px 12px 4px;
  }

  .MuiInputBase-root {
    border-radius: 5px;
  }
  .MuiInputBase-root.Mui-error {
    border-color: red;
  }

  label.Mui-error {
    color: red;
  }
  .MuiFormHelperText-root.Mui-error {
    color: red;
    font-family: "Inter Regular";
    font-size: 13px;
  }
  label {
    color: #2c2c2c !important;
  }
  .MuiFilledInput-root.Mui-disabled {
    background-color: #f2f2f2 !important;
    border-color: #e4e4e4 !important;
  }
  .MuiOutlinedInput-root.Mui-disabled > input {
    color: #2c2c2c !important;
    -webkit-text-fill-color: unset !important;
  }
  .MuiOutlinedInput-root.Mui-disabled > div {
    color: #2c2c2c !important;
    -webkit-text-fill-color: unset !important;
  }
  textarea {
    padding: 0 !important;
    resize: vertical;
  }
  .MuiInputLabel-shrink {
    transform: "translate(14px, -9px) scale(0.9)";
  }
  .MuiInputLabel-asterisk {
    color: red !important;
    font-size: 17px;
  }
`;

// @ts-ignore
export const BaseTextField = memo(
  forwardRef((props, ref) => {
    const { type } = props;
    const [state, setState] = useState({
      showPassword: false,
    });
    const handleClickShowPassword = useCallback(() => {
      setState({
        ...state,
        showPassword: !state.showPassword,
      });
    }, [state]);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const getType = useCallback(() => {
      if (type === "password") {
        if (state.showPassword) {
          return "text";
        }
      }
      return type;
    }, [type, state.showPassword]);
    const defaultEndAdornment = useMemo(() => {
      const isPasswordType = type === "password";
      if (isPasswordType) {
        return (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {state.showPassword ? (
                <VisibilityOffOutlined />
              ) : (
                <VisibilityOutlined />
              )}
            </IconButton>
          </InputAdornment>
        );
      }
    }, [handleClickShowPassword, state.showPassword, type]);

    return (
      <TextFieldStyled
        ref={ref}
        variant="outlined"
        {...props}
        InputProps={{
          endAdornment: defaultEndAdornment,
          ...props.InputProps,
        }}
        type={getType()}
      />
    );
  })
);
