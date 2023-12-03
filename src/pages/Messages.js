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
import {useSearchParams} from "react-router-dom"

const config = require("../config");

const messages = [
  { id: 1, text: "Hi there!", sender: "bot" },
  { id: 2, text: "Hello!", sender: "user" },
  { id: 3, text: "How can I assist you today?", sender: "bot" },
];

const ChatUI = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedUserName, setSelectedUserName] = React.useState(searchParams.get("userName") ? searchParams.get("userName") : "");
  const [selectedUserId, setSelectedUserId] = React.useState(0);
  const [text,setText]=React.useState("");
  const [msgList,setMsgList]=React.useState([])
  const [userList,setUserList]=React.useState([])
  const [connection,setConnection]=React.useState(window.connection);
  
  React.useEffect(()=>{
    return () => checkConnection();
  },[]);

  React.useEffect(()=>{
    if(connection){
      Connect();
    }
  },[connection]);
  
  const checkConnection = () =>{
    setTimeout(()=>{
      if(window.connection){
        setConnection(window.connection);
      }else{
        checkConnection();
      }
    },500);
  }
  const Connect = () => {   
    console.log('Connect called');  
      getChats();
      onError();
      onNewMessage();
      onUserChats();
      onPreviousMessages();
  }

  const SendPrivate = (recieverName = selectedUserName ? selectedUserName : "", message = text) => {

    console.log("RecieverName", recieverName);
    connection.invoke("SendPrivate", recieverName, message).catch(function (err) {
      return console.error(err.toString());
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
      setUserList(messagesObject)
      console.log('USER CHATS ----- ', messagesObject);
    });
  }
  const onPreviousMessages = () => {
    connection.on("previousMessages", (messagesObject) => {
      console.log('PREVIOUS MESSAGES ----- ', messagesObject);
      let count =0;
      let messages = messagesObject.map((message)=>{
        count ++;
        return {
          id: count,
          text: message.content,
          sender: message.senderUserName
        }
      });
      setMsgList(messages)
    });
  }

  const getChats = () =>{
    console.log('GetChats Invoked');
    connection.invoke("GetChats").then((userList)=>{
      console.log("UserList", userList);
    }).catch(function (err) {
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
                  onClick={() => handleItemClick(user.recieverUserName, user.id)}
                  sx={{
                    backgroundColor:
                      selectedUserName === user.recieverUserName ? "#fff" : "#EFEFF7",
                        "&:hover": {
                      backgroundColor:
                        selectedUserName !== user.recieverUserName ? "lightgray" : "#fff",
                    },
                  }}>

                  <ListItemAvatar>
                    <Avatar src={user.recieverPhoto}>
                      {/* <ImageIcon /> */}
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText primary={user.recieverFullName} secondary={user.recieverLastMessage} />
                </ListItem>
                ))}
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
  console.log("username",JSON.parse((((window.localStorage || {}).getItem("data") || {}).data || {}).user || "{}").username);
  const isBot = message.sender ===  JSON.parse((((window.localStorage || {}).getItem("data") || {}).data || {}).user || "{}").username;

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