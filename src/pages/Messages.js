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
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import * as signalR from '@microsoft/signalr';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const messages = [
  { id: 1, text: "Hi there!", sender: "bot" },
  { id: 2, text: "Hello!", sender: "user" },
  { id: 3, text: "How can I assist you today?", sender: "bot" },
];
let connection;


const ChatUI = () => {
  const [selectedUserName, setSelectedUserName] = React.useState("");
  const [selectedUserId, setSelectedUserId] = React.useState(0);
  const [text,setText]=React.useState("");
  const [msgList,setMsgList]=React.useState([])
  const [userList,setUserList]=React.useState([])

  
  React.useEffect(() => {
    return () => Connect();
  },[])

  const Connect = () =>{    
    connection = new signalR.HubConnectionBuilder().withUrl("https://api.roomie.helloworldeducation.com/chat", {
      accessTokenFactory: ()=> (JSON.parse((localStorage || {}).getItem('data') || {}).data || "{}").accessToken || "" 
    }).build();
  
    connection.start().then(function () {
        console.log("SignalR ile bağlantı kuruldu.");
    
        onConnected();
        onError();
        onNewMessage();
        onUserChats();
        onPreviousMessages();
    
      }).catch(function (err) {
          return console.error(err.toString());
      });
  }

  const SendPrivate = (recieverName = selectedUserName ? selectedUserName : "", message = text) => {

    console.log("RecieverName", recieverName);
    connection.invoke("SendPrivate", recieverName, message).catch(function (err) {
      return console.error(err.toString());
    });
  }

  const onConnected = () => {
    connection.on("Connected", (userList) => {
      console.log("ConnectedUserList", userList);
      setUserList(userList);
    });
  }

  const onError = () => {
    connection.on("onError", (errorMessage) => {
      console.log(errorMessage);
    });
  }

  const onNewMessage = () => {
    connection.on("newMessage", (messagesObject) => {
      console.log("New Message --- ",  messagesObject);
    });
  }

  const onUserChats = () => {
    connection.on("UserChats", (messagesObject) => {
      console.log('USER CHATS ----- ', messagesObject);
    });
  }
  const onPreviousMessages = () => {
    connection.on("previousMessages", (messagesObject) => {
      console.log('PREVIOUS MESSAGES ----- ', messagesObject);
    });
  }

  const getChats = () =>{
    connection.invoke("GetChats").catch(function (err) {
      return console.error(err.toString());
    });
  }
  
  const getMessagesByChat = (id) => {
    connection.invoke("GetMessagesByChat", Number(id)).catch(function (err) {
      return console.error(err.toString());
    });
  }
  const handleItemClick = (userName,userId) => {
    setSelectedUserName(userName);
    setSelectedUserId(userId);
    getMessagesByChat(userId);
  };

  const handleSend = () => {
    SendPrivate();
  };

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  return (
    <Box>
      {msgList.map((msg)=>(
        <p>{msg}</p>
      ))}
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <NavBar></NavBar>
        </Grid>
        {selectedUserName === ""? (
          <Grid item xs={12} lg={12}>
            <Box>
              <List sx={{ width: "100%", height: "90vh", bgcolor: "#EFEFF7" }}>
                {userList && userList.map((user)=>(
                  <ListItem
                  onClick={() => handleItemClick(user.RecieverUserName, user.Id)}
                  sx={{
                    backgroundColor:
                      selectedUserName === user.RecieverUserName ? "#fff" : "#EFEFF7",
                        "&:hover": {
                      backgroundColor:
                        selectedUserName !== user.RecieverUserName ? "lightgray" : "#fff",
                    },
                  }}>

                  <ListItemAvatar>
                    <Avatar src={user.RecieverPhoto}>
                      {/* <ImageIcon /> */}
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText primary={user.RecieverFullName} secondary={user.RecieverLastMessage} />
                </ListItem>
                ))}
                <ListItem
                  onClick={() => handleItemClick("roomie.test2")}
                  sx={{
                    backgroundColor:
                      selectedUserName === "roomie.test2" ? "#fff" : "#EFEFF7",
                        "&:hover": {
                      backgroundColor:
                        selectedUserName !== "roomie.test2" ? "lightgray" : "#fff",
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
                  onClick={() => handleItemClick("List Item 2","roomie.test2")}
                  sx={{
                    backgroundColor:
                      selectedUserName === "List Item 2" ? "#fff" : "#EFEFF7",
                    "&:hover": {
                      backgroundColor:
                        selectedUserName !== "List Item 2" ? "lightgray" : "#fff", // İstenilen hover rengini buradan belirleyebilirsiniz
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
                      selectedUserName === "List Item 3" ? "#fff" : "#EFEFF7",
                    "&:hover": {
                      backgroundColor:
                        selectedUserName !== "List Item 3" ? "lightgray" : "#fff", // İstenilen hover rengini buradan belirleyebilirsiniz
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
        ):(
          <Grid item xs={12} lg={12}>
            <Box>
              <IconButton edge="end" aria-label="favorite" onClick={()=>setSelectedUserName("")} >
                  <ArrowBackIcon/>
              </IconButton>
              <Box
                sx={{ height: "100%", display: "flex", flexDirection: "column", overflow:"scroll" }}>
                <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
                  {msgList.map((message,index) => (
                    <Message key={index} message={message} />
                  ))}
                </Box>

                <Box sx={{ p: 2, backgroundColor: "background.default", bottom:"0", position:"fixed",width:"100%"  }}>
                  <Grid container spacing={2} alignItems="flex-start">
                    <Grid item xs={10} sm={10} md={10}>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Mesajınızı yazınız..."
                        value={text}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    
                    <Grid item xs={2} sm={2} md={2} >
                      <Button
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          margin:"auto",
                          maxWidth:"150"  
                        }}
                        size="large"
                        color="inherit"
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
        )}
        

        
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