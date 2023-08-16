import React from "react";
import NavBar from "../components/NavBar";
import List from "../components/AlignItemsList";
import { Grid, Box, Typography, colors } from "@mui/material";
import Properties from "../components/Properties";

export default function Favorites() {
  return (
    <div>
      <Box>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <NavBar></NavBar>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Box display={"flex"}>
              <List title={"Favoriler"}></List>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
