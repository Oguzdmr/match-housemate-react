import React from "react";
import NavBar from "../components/NavBar";
import List from "../components/AlignItemsList";
import { Grid, Box } from "@mui/material";
import Favorite from "../services/Favorite";

export default function Favorites() {
  const [items, setItems] = React.useState([]);
  const service = new Favorite();

  React.useEffect(()=>{
    const getItems = async () => {
      let _items = await service.getFavoritesUser();

      setItems(_items.response.data)

      console.log("_items",_items);
      console.log("items",items);
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
          <Grid item xs={12} lg={12}>
            <Box display={"flex"}>
              <List title={"Favoriler"} items={items}></List>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
