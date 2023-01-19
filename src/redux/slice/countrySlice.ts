import { createSlice } from "@reduxjs/toolkit";

import CountryListType from "../../types/type";

type InitialState = {
  countryList: CountryListType[];
  favoriteList: CountryListType[];
  countryDetail: CountryListType[];
  url: string;
};

const initialState: InitialState = {
  countryList: [],
  favoriteList: [],
  countryDetail: [],
  url: "https://restcountries.com/v3.1/all",
};

const countrySlice = createSlice({
  name: "countryList",
  initialState,
  reducers: {
    getCountryData: (state, action) => {
      state.countryList = action.payload;
    },
    addToFavorite: (state, action) => {
      state.favoriteList.push(action.payload);
    },
    removeFromFavorite: (state, action) => {
      let index = 0;
      for (let i = 0; i < state.favoriteList.length; i++) {
        if (state.favoriteList[i].name.common === action.payload.name.common) {
          index = i;
          break;
        }
      }
      state.favoriteList.splice(index, 1);
    },
    setUrl: (state, action) => {
      if (action.payload.length === 0) {
        state.url = "https://restcountries.com/v3.1/all";
      } else {
        state.url = "https://restcountries.com/v3.1/name/" + action.payload;
      }
    },
    displayCountryDetail: (state, action) => {
      state.countryDetail = [action.payload];
    },
    sortNameAscending: (state) => {
      state.countryList.sort((a, b): number => {
        const nameA = a.name.common.toUpperCase();
        const nameB = b.name.common.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    },
    sortNameDescending: (state) => {
      state.countryList.sort((a, b): number => {
        const nameA = a.name.common.toUpperCase();
        const nameB = b.name.common.toUpperCase();
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      });
    },
  },
});

const countriesReducer = countrySlice.reducer;
export default countriesReducer;
export const countriesActions = countrySlice.actions;
