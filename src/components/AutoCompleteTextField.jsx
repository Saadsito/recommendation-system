import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";

const filter = createFilterOptions();

const AutocompleteTextField = ({ value, setValue, array, label }) => {
  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setValue(newValue);
          console.log(value);
        } else if (newValue && newValue.inputValue) {
          setValue(newValue.inputValue);
          console.log(value);
        } else {
          setValue(newValue);
          console.log(value);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        const isExisting = options.some(
          (option) => inputValue === option || inputValue === option.title
        );
        if (inputValue !== "" && !isExisting) {
          filtered.unshift(inputValue);
        }

        return filtered;
      }}
      options={array}
      renderInput={(params) => <TextField {...params} label={label} />}
      multiple
      id="tags-outlined"
      filterSelectedOptions
      limitTags={1}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
    />
  );
};

export default AutocompleteTextField;
