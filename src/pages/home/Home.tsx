import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TableFooter from "@mui/material/TableFooter";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import Avatar from "@mui/material/Avatar";


import { useSelector, useDispatch } from "react-redux/es/exports";
import { countriesActions } from "../../redux/slice/countrySlice";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import fetchCoutriesData from "../../thunk/fetchcountries";
import CountryListType from "../../types/type";
import SearchTab from "./searchTab/SearchTab";
import Loading from "./loading/Loading";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.common.white,
    
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Home() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [addOpen, setAddOpen] = React.useState(false);
  const [duplicateOpen, setDuplicateOpen] = React.useState(false);
  const [countryName, setCountryName] = React.useState("");

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setAddOpen(false);
    setDuplicateOpen(false);
  };

  const countriesList = useSelector(
    (state: RootState) => state.countryList.countryList
  );
  const favoriteList = useSelector(
    (state: RootState) => state.countryList.favoriteList
  );
  const countryUrl = useSelector((state: RootState) => state.countryList.url);
  const dispatch = useDispatch<AppDispatch>();

  function AddtoFavorite(country: CountryListType): void {
    let flag = 0;
    setCountryName(country.name.common);
    for (let i = 0; i < favoriteList.length; i++) {
      if (favoriteList[i].name.common === country.name.common) {
        flag = 1;
        break;
      }
    }
    if (flag === 0) {
      setAddOpen(true);
      dispatch(countriesActions.addToFavorite(country));
    } else {
      setDuplicateOpen(true);
    }
  }

  useEffect(() => {
    dispatch(fetchCoutriesData(countryUrl));
  }, [dispatch, countryUrl]);

  function SetColor(country: CountryListType): string {
    for (let i = 0; i < favoriteList.length; i++) {
      if (favoriteList[i].name.common === country.name.common) {
        return "red";
      }
    }
    return "black";
  }

  function CheckTypeCapital(country: CountryListType): string {
    if (country.capital !== undefined) {
      return country.capital[0];
    } else {
      return "NA";
    }
  }

  function DisplayDetails(country: CountryListType): void {
    dispatch(countriesActions.displayCountryDetail(country));
  }

  function SortNameAscend(): void {
    dispatch(countriesActions.sortNameAscending());
  }
  function SortNameDescend(): void {
    dispatch(countriesActions.sortNameDescending());
  }
  if (countriesList.length === 0) {
    return <Loading/>
  }
  return (
    <div>
      <SearchTab />

      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 5 }}>
        <TableContainer sx={{ width: 0.9 }} component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow >
                <StyledTableCell></StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ fontFamily: "Nunito, sans-serif" }}
                >
                  Name
                  <IconButton
                    size="small"
                    style={{ color: "white" }}
                    onClick={() => SortNameAscend()}
                  >
                    <NorthIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    style={{ color: "white" }}
                    onClick={() => SortNameDescend()}
                  >
                    <SouthIcon fontSize="small" />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell
                  align="right"
                  sx={{ fontFamily: "Nunito, sans-serif" }}
                >
                  Region
                </StyledTableCell>
                <StyledTableCell
                  align="right"
                  sx={{ fontFamily: "Nunito, sans-serif" }}
                >
                  Capital
                </StyledTableCell>
                <StyledTableCell
                  align="right"
                  sx={{ fontFamily: "Nunito, sans-serif" }}
                >
                  Population
                </StyledTableCell>
                <StyledTableCell
                  align="right"
                  sx={{ fontFamily: "Nunito, sans-serif" }}
                >
                  Favorite
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {countriesList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((country) => (
                  <StyledTableRow key={country.name.common}>
                    <td align="center" width="4%">
                      <Button>
                        <Link
                          to="/countrydetails"
                          className="link"
                          style={{ textDecoration: "none" }}
                          onClick={() => DisplayDetails(country)}
                        >
                          <Avatar variant="rounded" src={country.flags.png} />
                        </Link>
                      </Button>
                    </td>
                    <StyledTableCell
                      align="center"
                      sx={{ fontFamily: "Nunito, sans-serif" }}
                    >
                      {country.name.common}
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      sx={{ fontFamily: "Nunito, sans-serif" }}
                    >
                      {country.region}
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      sx={{ fontFamily: "Nunito, sans-serif" }}
                    >
                      {CheckTypeCapital(country)}
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      sx={{ fontFamily: "Nunito, sans-serif" }}
                    >
                      {country.population}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <IconButton
                        aria-label="add to favorites"
                        style={{ color: SetColor(country) }}
                        onClick={() => AddtoFavorite(country)}
                      >
                        <FavoriteIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
            <TableFooter
              sx={{
                position: "relative",
                right: 150,
                fontFamily: "Nunito, sans-serif",
              }}
            >
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 100]}
                  component="td"
                  count={countriesList.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>

        <Snackbar
          open={addOpen}
          autoHideDuration={1500}
          onClose={handleClose}
          sx={{ fontFamily: "Nunito, sans-serif" }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {countryName} added to the favorite page
          </Alert>
        </Snackbar>

        <Snackbar
          open={duplicateOpen}
          autoHideDuration={1500}
          onClose={handleClose}
          sx={{ fontFamily: "Nunito, sans-serif" }}
        >
          <Alert
            onClose={handleClose}
            severity="warning"
            sx={{ width: "100%" }}
          >
            {countryName} already in favorite page
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
}
