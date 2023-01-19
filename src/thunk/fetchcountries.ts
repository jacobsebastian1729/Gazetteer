import { countriesActions } from "../redux/slice/countrySlice";
import { AppDispatch } from "../redux/store";

export default function fetchCoutriesData(url: string) {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const countriesData = await response.json();
      dispatch(countriesActions.getCountryData(countriesData));
    } catch (error) {}
  };
}
