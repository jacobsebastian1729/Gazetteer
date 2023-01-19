import * as React from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PublicIcon from "@mui/icons-material/Public";

import { useSelector } from "react-redux/es/exports";
import { RootState } from "../../redux/store";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

export default function Hearer(props: Props) {
  const FavoriteList = useSelector(
    (state: RootState) => state.countryList.favoriteList
  );

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        COUNTRY
      </Typography>
      <Divider />
      <List>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <HomeIcon />
        </IconButton>

        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={FavoriteList.length} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Link to="/" className="link">
            <IconButton
              sx={{ color: "white" }}
              aria-label="open drawer"
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          </Link>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              textAlign: "left",
              fontFamily: "Nunito, sans-serif",
            }}
          >
            COUNTRY
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Link to="/home" className="link">
              <IconButton size="large" aria-label="homeicon" color="inherit">
                <HomeIcon sx={{ color: "white" }} />
              </IconButton>
            </Link>
            <Link to="/favorite" className="link">
              <IconButton
                size="large"
                aria-label="favoriteicon"
                color="inherit"
              >
                <Badge badgeContent={FavoriteList.length} color="error">
                  <FavoriteIcon sx={{ color: "white" }} />
                </Badge>
              </IconButton>
            </Link>
            <Link to="/countrydetails" className="link">
              <IconButton size="large" aria-label="homeicon" color="inherit">
                <PublicIcon sx={{ color: "white" }} />
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 2 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}
