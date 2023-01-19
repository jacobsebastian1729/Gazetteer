import * as React from "react";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import bgmap from "../../assets/bgmap.png";

export default function StartPage() {
  return (
    <div
      style={{
        backgroundImage: `url(${bgmap})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        opacity: 0.9,
        height: "90vh",
        
      }}
    >
      <Link
        to="/home"
        className="link"
        style={{ textDecoration: "none", font: "Nunito, sans-serif" }}
      >
        <Button
          variant="contained"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#212c6f"
          }}
        >
          START
        </Button>
      </Link>
    </div>
  );
}
