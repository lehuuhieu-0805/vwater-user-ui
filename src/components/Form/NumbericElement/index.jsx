import {
  Control,
  Controller,
  ControllerProps,
  FieldError,
  Path,
} from "react-hook-form";
// import { FieldValues } from "react-hook-form/dist/types/fields";
import { BaseTextFieldProps } from "../BaseTextField";
import { TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";
import React from "react";

export default function NumbericElement({
  validation = {},
  parseError,
  type,
  required,
  name,
  control,
  disabled,
  value,
  extendClassNames,
  ...rest
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
      }) => {
        let helperText = rest.helperText;
        if (error) {
          if (typeof parseError === "function") {
            helperText = parseError(error);
          } else {
            helperText = error.message;
          }
        }
        return (
          <>
            <NumericFormat
              {...rest}
              value={value ?? ""}
              label={rest.label}
              disabled={disabled}
              className={extendClassNames}
              name={name}
              onChange={(ev) => {
                onChange(ev);
                if (typeof rest.onChange === "function") {
                  rest.onChange(ev);
                }
              }}
              onBlur={(ev) => {
                onBlur();
                if (typeof rest.onBlur === "function") {
                  rest.onBlur(ev);
                }
              }}
              sx={{
                "& input": {
                  textAlign: "end !important",
                  backgroundColor: disabled ? "#F7F7F7F7" : null,
                  WebkitTextFillColor: "#000 !important",
                },
                "& label": {
                  color: "#2c2c2c!important",
                },
              }}
              thousandSeparator=","
              decimalScale={2}
              fullWidth
              customInput={TextField}
            />
            <div style={{ paddingTop: "6px" }}>
              {helperText && <span className="err-mess">{helperText}</span>}
            </div>
          </>
        );
      }}
    />
  );
}
