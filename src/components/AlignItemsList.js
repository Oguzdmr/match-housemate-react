import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import Match from "../services/MatchService";
import Favorite from "../services/Favorite";
import Preferences from "../models/Preferences"


export default function AlignItemsList({ title,items }) {

  const [preferencesText,setPreferencesText] = React.useState({})
  const service = new Favorite();
  const preferencesClass = new Preferences()

  const preferences = (items) => {
    var _preferencesObj = {
      acceptableRoommatesMax : parseInt(items.preferences.acceptableRoommatesMax) === 999 ? "Farketmez": items.preferences.acceptableRoommatesMax,
      acceptableRoommatesMin:items.preferences.acceptableRoommatesMin,
      alcoholAllowed:items.preferences.alcoholAllowed === 2 ? "Tartışılabilir" : (items.preferences.alcoholAllowed === 1 ? "Evet": "Hayır"),
      budgetMax:items.preferences.budgetMax >= 100000 ? "Farketmez" : items.preferences.budgetMax.toString(),
      budgetMin:items.preferences.budgetMin.toString(),
      duration:items.preferences.duration === 2 ? "Farketmez" : (items.preferences.duration === 1 ? "Yıllık": "Dönemlik"),
      foreignersAllowed:items.preferences.foreignersAllowed === 2 ? "Tartışılabilir" : (items.preferences.foreignersAllowed === 1 ? "Evet": "Hayır"),
      genderPref:items.preferences.genderPref === 2 ? "Farketmez" : (items.preferences.genderPref === 1 ? "Kadın": "Erkek"),
      guestsAllowed:items.preferences.guestsAllowed === 2 ? "Tartışılabilir" : (items.preferences.guestsAllowed === 1 ? "Evet": "Hayır"),
      hasHome:items.preferences.hasHome  ? "Hayır" : "Evet",
      petsAllowed:items.preferences.petsAllowed === 2 ? "Tartışılabilir" : (items.preferences.petsAllowed === 1 ? "Evet": "Hayır"),
      smokingAllowed:items.preferences.smokingAllowed === 2 ? "Tartışılabilir" : (items.preferences.smokingAllowed === 1 ? "Evet": "Hayır"),
    }

    console.log("PREF",_preferencesObj);
    return _preferencesObj;
  }

  const objToText = (preferences) => {
    var allText = "";

    allText += preferences["genderPref"] + "\n" + preferences["smokingAllowed"]

    return allText;
  }

  const handleClickAddFavorite = async (id) => {

    await service.addFavoritesUser(
      id
    );
  };

  const handleClickRemoveFavorite = async (id) => {

    await service.removeFavoritesUser(
      id
    );
  };
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
        <div key={item.id}>
              <ListItem alignItems="flex-start" secondaryAction={
                    <IconButton edge="end" aria-label="favorite" onClick={()=>handleClickAddFavorite(item.id)} >
                      <StarBorderIcon />
                    </IconButton>
                  } >
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
                      { objToText(preferences(item))  }
                      
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            </div>
      ))}
      
    </List>
  );
}
