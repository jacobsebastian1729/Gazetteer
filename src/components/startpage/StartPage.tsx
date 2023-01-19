import * as React from "react";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";

export default function StartPage() {
  return (
    <div
      style={{
        backgroundColor: "#dddddd",
        marginTop: -50,
        height: 700,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <Link
              to="/home"
              className="link"
              style={{ textDecoration: "none", font: "Nunito, sans-serif" }}
            >
              <Button variant="contained">START</Button>
            </Link>
      
    </div>
  );
}
