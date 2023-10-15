import * as React from "react";
import { Box, TextField, Button, Typography, Grid, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import NavBar from "../components/NavBar";

const messages = [
  { id: 1, text: "Hi there!", sender: "bot" },
  { id: 2, text: "Hello!", sender: "user" },
  { id: 3, text: "How can I assist you today?", sender: "bot" },
];

const ChatUI = () => {
  const [input, setInput] = React.useState("");
  const [selectedItem, setSelectedItem] = React.useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  const handleSend = () => {
    if (input.trim() !== "") {
      console.log(input);

      setInput("");
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <NavBar></NavBar>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Box>
            <List sx={{ width: "100%", height: "90vh", bgcolor: "#EFEFF7" }}>
              <ListItem
                onClick={() => handleItemClick("List Item 1")}
                sx={{
                  backgroundColor:
                    selectedItem === "List Item 1" ? "#fff" : "#EFEFF7",
                      "&:hover": {
                    backgroundColor:
                      selectedItem !== "List Item 1" ? "lightgray" : "#fff",
                  },
                }}>

                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
              </ListItem>

              <ListItem
                onClick={() => handleItemClick("List Item 2")}
                sx={{
                  backgroundColor:
                    selectedItem === "List Item 2" ? "#fff" : "#EFEFF7",
                  "&:hover": {
                    backgroundColor:
                      selectedItem !== "List Item 2" ? "lightgray" : "#fff", // İstenilen hover rengini buradan belirleyebilirsiniz
                  },
                }}>

                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText primary="Work" secondary="Jan 7, 2014" />
              </ListItem>

              <ListItem
                onClick={() => handleItemClick("List Item 3")}
                sx={{
                  backgroundColor:
                    selectedItem === "List Item 3" ? "#fff" : "#EFEFF7",
                  "&:hover": {
                    backgroundColor:
                      selectedItem !== "List Item 3" ? "lightgray" : "#fff", // İstenilen hover rengini buradan belirleyebilirsiniz
                  },
                }}>

                <ListItemAvatar>
                  <Avatar>
                    <BeachAccessIcon />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText primary="Vacation" secondary="July 20, 2014" />
              </ListItem>
            </List>
          </Box>
        </Grid>

        <Grid item xs={12} lg={8}>
          <Box>
            <Box
              sx={{ height: "90vh", display: "flex", flexDirection: "column" }}>
              <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
                {messages.map((message) => (
                  <Message key={message.id} message={message} />
                ))}
              </Box>

              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Grid container spacing={2}>
                  <Grid item xs={10}>
                    <TextField
                      fullWidth
                      placeholder="Type a message"
                      value={input}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  
                  <Grid item xs={2}>
                    <Button
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      fullWidth
                      size="large"
                      color="primary"
                      variant="contained"
                      endIcon={<SendIcon />}
                      onClick={handleSend}
                    ></Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const Message = ({ message }) => {
  const isBot = message.sender === "bot";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isBot ? "flex-start" : "flex-end",
        mb: 2,
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          p: 1,
          backgroundColor: isBot ? "primary.light" : "secondary.light",
        }}
      >
        <Typography variant="body1">{message.text}</Typography>
      </Paper>
    </Box>
  );
};

export default ChatUI;
