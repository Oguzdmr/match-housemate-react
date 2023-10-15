import React from "react";
import NavBar from "../components/NavBar";
import List from "../components/AlignItemsList";
import { Grid, Box } from "@mui/material";
import Properties from "../components/Properties";
import Match from "../services/MatchService";

export default function Home() {
  const [items, setItems] = React.useState([]);
  const service = new Match();

  React.useEffect(()=> {
    const getItems = async () => {
      let _items = await service.getMatchUser();
      
      setItems((((_items || []).response || {}).data || {}).matches || []) 

      console.log("_items", _items);
      console.log("items", items);
    }

    getItems();
  },[])
  
  return (
    <div>
      <Box>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <NavBar></NavBar>
          </Grid>
          
          <Grid item xs={12} lg={8}>
            <Box display={"flex"}>
              <List title={"Eşleşen Kişiler"} items={items}></List>
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
  );
}
