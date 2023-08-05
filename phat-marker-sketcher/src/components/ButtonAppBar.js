import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const buttons = ["Load project", "New project", "Save project"];

export default function ButtonAppBar() {
  return (
    <Box style={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ my: 2, mr: 3 }}>
            🖊️ Phat Marker Sketcher
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {buttons.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
