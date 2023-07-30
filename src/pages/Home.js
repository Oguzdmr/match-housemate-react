import React from 'react'
import NavBar from '../components/NavBar'
import List  from '../components/List'
import { Grid, Box,Typography, colors } from "@mui/material";
import Properties from '../components/Properties';

export default function Home() {
  return (
    <div>
        
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
            <NavBar></NavBar>
        </Grid>
        <Grid item xs={12} lg={8}>
            <Box>
                <List></List>
            </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
            <Box>
                <Properties></Properties>
            </Box>
        </Grid>
        
      </Grid>
    </Box>
        
    </div>
  )
}
