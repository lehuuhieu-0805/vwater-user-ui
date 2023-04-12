import React from "react";
import {
  Control,
  Controller,
  ControllerProps,
  FieldError,
  Path,
} from "react-hook-form";
import { BaseTextField } from "../BaseTextField";

export default function TextFieldElement({
  validation = {},
  parseError,
  type,
  required,
  name,
  control,
  ...rest
}) {
  if (required && !validation.required) {
    validation.required = "This field is required";
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
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
          <BaseTextField
            fullWidth={true}
            {...rest}
            name={name}
            value={rest.value ? rest.value : value ?? ""}
            onChange={(ev) => {
              onChange(ev);
              if (typeof rest.onChange === "function") {
                rest.onChange(ev);
              }
            }}
            inputRef={(r) => {
              if (rest.inputRef) {
                rest.inputRef.current = r;
              }
              ref(r);
            }}
            onBlur={(ev) => {
              onBlur();
              if (typeof rest.onBlur === "function") {
                rest.onBlur(ev);
              }
            }}
            required={required}
            type={type}
            error={!!error}
            helperText={helperText}
          />
        );
      }}
    />
  );
}
