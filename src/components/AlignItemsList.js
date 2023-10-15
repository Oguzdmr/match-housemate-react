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


export default function AlignItemsList({ title, items }) {

  const [preferencesText,setPreferencesText] = React.useState({})
  const service = new Favorite();

  const preferences = (items) => {
    var itemsPreferences = (items || []).preferences || {};

    var _preferencesObj = {
      acceptableRoommatesMax : parseInt(itemsPreferences.acceptableRoommatesMax) === 999 ? "Farketmez": itemsPreferences.acceptableRoommatesMax || "",
      acceptableRoommatesMin:itemsPreferences.acceptableRoommatesMin || "",
      alcoholAllowed:itemsPreferences.alcoholAllowed === 2 ? "Tartışılabilir" : (itemsPreferences.alcoholAllowed === 1 ? "Evet": "Hayır"),
      budgetMax:(itemsPreferences.budgetMax || 0) >= 100000 ? "Farketmez" : (itemsPreferences.budgetMax || 0).toString(),
      budgetMin:itemsPreferences.budgetMin.toString(),
      duration:itemsPreferences.duration  === 2 ? "Farketmez" : (itemsPreferences.duration === 1 ? "Yıllık": "Dönemlik"),
      foreignersAllowed:itemsPreferences.foreignersAllowed === 2 ? "Tartışılabilir" : (itemsPreferences.foreignersAllowed === 1 ? "Evet": "Hayır"),
      genderPref:itemsPreferences.genderPref === 2 ? "Farketmez" : (itemsPreferences.genderPref === 1 ? "Kadın": "Erkek"),
      guestsAllowed:itemsPreferences.guestsAllowed === 2 ? "Tartışılabilir" : (itemsPreferences.guestsAllowed === 1 ? "Evet": "Hayır"),
      hasHome:itemsPreferences.hasHome  ? "Hayır" : "Evet",
      petsAllowed:itemsPreferences.petsAllowed === 2 ? "Tartışılabilir" : (itemsPreferences.petsAllowed === 1 ? "Evet": "Hayır"),
      smokingAllowed:itemsPreferences.smokingAllowed === 2 ? "Tartışılabilir" : (itemsPreferences.smokingAllowed === 1 ? "Evet": "Hayır"),
    }

    console.log("PREF",_preferencesObj);
    return _preferencesObj;
  }

  const objToText = (preferences) => {
    var allText = "";

    allText += preferences["genderPref"] || "" + "\n" + preferences["smokingAllowed"] || ""

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
        <div key={item.user.id}>
              <ListItem alignItems="flex-start" secondaryAction={
                    <IconButton edge="end" aria-label="favorite" onClick={()=>handleClickAddFavorite(item.user.id)} >
                      {item.isFolowing ? <StarIcon/> : <StarBorderIcon/>}
                    </IconButton>
                  } >
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={item.user.firstName || "" + " " + item.user.lastName || ""}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      { objToText(preferences(item.user))  }
                      
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
