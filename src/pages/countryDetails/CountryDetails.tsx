import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";

import { useSelector } from "react-redux/es/exports";
import { RootState } from "../../redux/store";

import CountryListType from "../../types/type";

export default function CountryDetails() {
  const countryDetails = useSelector(
    (state: RootState) => state.countryList.countryDetail
  );

  const { v4: uuidv4 } = require("uuid");

  function CheckTypeLanguage(country: CountryListType): boolean {
    if (country.languages !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  if (countryDetails.length !== 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card sx={{ maxWidth: 450, width: 0.6 }}>
          <CardMedia
            sx={{ height: 250 }}
            image={countryDetails[0].flags.png}
            title={countryDetails[0].name.common}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              fontFamily="Nunito, sans-serif"
            >
              {countryDetails[0].name.common}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              align="left"
              fontFamily="Nunito, sans-serif"
            >
              Region: {countryDetails[0].region}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              align="left"
              fontFamily="Nunito, sans-serif"
            >
              Population: {countryDetails[0].population}
            </Typography>
            <Grid sx={{ display: "flex" }}>
              <Typography
                variant="body1"
                color="text.secondary"
                align="left"
                fontFamily="Nunito, sans-serif"
              >
                Languages:
              </Typography>{" "}
              {CheckTypeLanguage(countryDetails[0])
                ? Object.values(countryDetails[0].languages).map((val) => (
                    <Typography
                      sx={{ marginLeft: 2 }}
                      variant="body1"
                      color="text.secondary"
                      key={uuidv4()}
                      fontFamily="Nunito, sans-serif"
                    >
                      {val}
                    </Typography>
                  ))
                : null}
            </Grid>
          </CardContent>
          <CardActions>
            <Link
              to="/home"
              className="link"
              style={{ textDecoration: "none", font: "Nunito, sans-serif" }}
            >
              <Button size="small">
                <KeyboardBackspaceIcon />
                HOME
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Box>
    );
  } else {
    return <div></div>;
  }
}
