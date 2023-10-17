import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";

const filter = createFilterOptions();

const AutocompleteFilter = ({ value, setValue, array, label }) => {
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

export default AutocompleteFilter;
