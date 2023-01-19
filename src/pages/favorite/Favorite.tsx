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
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { useSelector, useDispatch } from "react-redux/es/exports";
import { countriesActions } from "../../redux/slice/countrySlice";
import { AppDispatch, RootState } from "../../redux/store";
import CountryListType from "../../types/type";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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

  const [removeOpen, setRemoveOpen] = React.useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setRemoveOpen(false);
  };

  const countriesList = useSelector(
    (state: RootState) => state.countryList.favoriteList
  );
  const dispatch = useDispatch<AppDispatch>();

  function CheckType(country: CountryListType): string {
    if (country.capital !== undefined) {
      return country.capital[0];
    } else {
      return "NA";
    }
  }

  function RemoveFavorite(country: CountryListType): void {
    setRemoveOpen(true);
    dispatch(countriesActions.removeFromFavorite(country));
  }

  return (
    <div style={{background: 'radial-gradient( #00b0ff, white)', height: "100vh"}}>
    <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
      <TableContainer sx={{ width: 0.9 }} component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="right">Region</StyledTableCell>
              <StyledTableCell align="right">Capital</StyledTableCell>
              <StyledTableCell align="right">Population</StyledTableCell>
              <StyledTableCell align="right">Favorite</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countriesList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((country) => (
                <StyledTableRow key={country.name.common}>
                  <StyledTableCell component="th" scope="row">
                    {country.name.common}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {country.region}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {CheckType(country)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {country.population}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() => RemoveFavorite(country)}
                    >
                      Remove
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
          <TableFooter sx={{ position: "relative", right: 150 }}>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
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
      <Snackbar open={removeOpen} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          A Country just removed from the favorite page
        </Alert>
      </Snackbar>
      
    </Box>
    <Box sx={{ height: '50px' }}></Box>
    </div>
  );
}
