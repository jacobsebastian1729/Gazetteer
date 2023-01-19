import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "white",
        padding: 1,
        position: "fixed",
        width: 1,
        bottom: 0,
      }}
    >
      <Typography variant="body2" align="center">
        Copyright © {currentYear} Your Company. All rights reserved.
      </Typography>
      <Typography variant="body2" align="center">
        <Link color="inherit" href="#">
          Privacy Policy
        </Link>{" "}
        |{" "}
        <Link color="inherit" href="#">
          Terms of Use
        </Link>
      </Typography>
    </Box>
  );
}
