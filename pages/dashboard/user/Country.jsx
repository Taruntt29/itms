import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
const countries = [{ code: "IN", label: "India", phone: "91" }];
const Country = () => {
  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label} ({option.code}) +{option.phone}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          value={countries}
          inputProps={{
            ...params.inputProps,
            autoComplete: "India", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

export default Country;
