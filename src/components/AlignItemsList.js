import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Match from "../services/MatchService";


export default function AlignItemsList({ title }) {
  const [items, setItems] = React.useState([]);
  const service = new Match();

  React.useEffect(()=>{
    const getItems = async () => {
      let _items = await service.getMatchUser();
      setItems(_items.response.data.matches)
      console.log("_items",_items);
      console.log("items",items);
    }
    getItems();
  },[])
  return (
    <List
      sx={{
        width: "95%",
        height: "80vh",
        margin: "2rem",
        bgcolor: "#FFFFFF",
        borderRadius: "10px",
        overflow: "auto",
        fontFamily: "Mulish",
      }}
    >
      <Typography
        sx={{
          fontSize: "30px",
          fontWeight: "500",
          color: "#313C58",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Mulish",
        }}
      >
        {title}
      </Typography>
      {items.length > 0 && items.map((item)=>(
        <>
              <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={item.firstName + " " + item.lastName}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {item.email}
                    </Typography>
                    {" "}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            </>
      ))}
      
    </List>
  );
}
