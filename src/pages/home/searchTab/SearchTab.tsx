import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

import { useDispatch } from "react-redux/es/exports";
import { countriesActions } from "../../../redux/slice/countrySlice";
import { AppDispatch } from "../../../redux/store";

export default function SearchTab() {
  const dispatch = useDispatch<AppDispatch>();

  function textHandler(event: React.ChangeEvent<HTMLInputElement>) {
    let text = event.target.value;
    dispatch(countriesActions.setUrl(text));
  }

  return (
    <Box sx={{ "& > :not(style)": { p: 3 } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          id="input"
          label=""
          variant="standard"
          placeholder="Search…"
          onChange={textHandler}
        />
      </Box>
    </Box>
  );
}
