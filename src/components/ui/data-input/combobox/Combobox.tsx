import {
  Autocomplete,
  TextField,
  type AutocompleteProps,
} from "@mui/material";
import { useState } from "react";

interface ComboboxComponentProps<T> extends Omit<AutocompleteProps<T, false, false, false>, "renderInput" | "options"> {
  options: T[];
  displayValue: (option: T) => string | null;
  filter?: (option: T, query: string) => boolean;
  anchor?: "bottom" | "top";
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
  "aria-label"?: string;
  children: (option: T) => React.ReactNode;
}

export default function Combobox<T>({
  options,
  displayValue,
  filter,
  anchor = "bottom",
  className,
  placeholder,
  autoFocus,
  "aria-label": ariaLabel,
  children,
  sx,
  ...props
}: ComboboxComponentProps<T>) {
  const [query, setQuery] = useState("");

  const filteredOptions = filter
    ? options.filter((option) => filter(option, query))
    : options;

  return (
    <Autocomplete
      {...props}
      options={filteredOptions}
      getOptionLabel={(option) => displayValue(option) || ""}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          autoFocus={autoFocus}
          inputProps={{
            ...params.inputProps,
            "aria-label": ariaLabel,
          }}
          size="small"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props}>
          {children(option)}
        </li>
      )}
      onInputChange={(_, newInputValue) => {
        setQuery(newInputValue);
      }}
      className={className}
      sx={{
        ...sx
      }}
    />
  );
}
