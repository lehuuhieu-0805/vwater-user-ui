import React from "react";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import {
  Control,
  Controller,
  ControllerProps,
  FieldError,
  Path,
  FieldValues,
} from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";
import clsx from "clsx";
import { BaseTextField } from "../BaseTextField";
import moment from "moment";

export default function DatePickerElement({
  isDate,
  parseError,
  name,
  required,
  parseDate,
  validation = {},
  inputProps,
  control,
  extendStyleDate,
  views = ["year", "month", "day"],
  inputFormat = "dd/MM/yyyy",
  readOnly = true,
  size = "small",
  ...rest
}) {
  // const styles = useStylesDatePicker();
  if (required && !validation.required) {
    validation.required = "This field is required";
  }

  return (
    <Controller
      name={name}
      rules={validation}
      control={control}
      render={({
        field: { onChange, value, onBlur },
        fieldState: { error },
      }) => {
        const _onChange = (value, keyboardInputValue) => {
          onChange(value, keyboardInputValue);
          if (typeof rest.onChange === "function") {
            rest.onChange(value, keyboardInputValue);
          }
        };

        return (
          <DatePicker
            inputFormat={inputFormat}
            views={views}
            {...rest}
            value={value || ""}
            onChange={_onChange}
            dayOfWeekFormatter={(d) => d}
            PaperProps={
              {
                // className: styles.shadow,
              }
            }
            renderInput={(params) => (
              <BaseTextField
                {...params}
                variant="outlined"
                // className={clsx(
                //   styles.StyleDatePicker,
                //   styles.required,
                //   extendStyleDate
                // )}
                size={size}
                inputProps={{
                  ...params.inputProps,
                  readOnly: readOnly,
                }}
                {...inputProps}
                required={!!required}
                error={!!error || (required ? !moment(value).isValid() : false)}
              />
            )}
          />
        );
      }}
    />
  );
}
