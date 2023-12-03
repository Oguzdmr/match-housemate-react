import * as React from "react";
import { Box, TextField, Button, Typography, Grid, Paper, colors } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from '@mui/icons-material/Image';
import NavBar from "../components/NavBar";
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useSearchParams} from "react-router-dom"

const ChatUI = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedUserName, setSelectedUserName] = React.useState(searchParams.get("userName") ? searchParams.get("userName") : "");
  const [selectedUserId, setSelectedUserId] = React.useState(0);
  const [text,setText]=React.useState("");
  const [msgList,setMsgList]=React.useState([])
  const [userList,setUserList]=React.useState([])
  const [connection,setConnection]=React.useState(window.connection);
  const messageContainerRef = React.useRef(null);

  React.useEffect(()=>{
    return () => checkConnection();
  },[]);

  React.useEffect(()=>{
    if(connection){
      Connect();
    }
  },[connection]);

  React.useEffect(() => {
    if (messageContainerRef.current) {
      window.scrollTo(0, messageContainerRef.current.scrollHeight)
    }
  }, [msgList]);

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
      getChats();
      onError();
      onNewMessage();
      onUserChats();
      onPreviousMessages();
  }

  const SendPrivate = (recieverName = selectedUserName ? selectedUserName : "", message = text) => {
    connection.invoke("SendPrivate", recieverName, message).catch(function (err) {
      return console.error(err.toString());
    });
  }

  const onError = () => {
    connection.on("onError", (errorMessage) => {
      console.error(errorMessage);
    });
  }

  const onNewMessage = () => {
    connection.on("newMessage", (messagesObject) => {
      console.log('NEW MESSAGE DEV',messagesObject);

      setMsgList(prevMessages => [...prevMessages, {id:0, text: messagesObject.content, sender : messagesObject.senderUserName}]);
    });
  }

  const onUserChats = () => {
    connection.on("UserChats", (messagesObject) => {
      console.log(messagesObject);
      setUserList(messagesObject)
    });
  }
  const onPreviousMessages = () => {
    connection.on("previousMessages", (messagesObject) => {
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
    connection.invoke("GetChats").then((userList)=>{
    }).catch(function (err) {
      return console.error(err.toString());
    });
  }
  
  const getMessagesByChat = (id) => {
    console.log(id)
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
    setText('');
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
                    <Avatar src={`data:image/png;base64,${user.recieverPhoto}`}>
                
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
                sx={{ height: "100%", display: "flex", flexDirection: "column", overflow:"scroll" }}
                ref={messageContainerRef}>
               <Box
                  sx={{ flexGrow: 1, overflow: "auto", p: 2,  marginBottom:"4em" }}
                >
                  {msgList.map((message, index) => (
                    <Message key={index} message={message} />
                  ))}
                </Box>

                <Box sx={{ p: 2, backgroundColor: "background.default", bottom:"0", position:"fixed",width:"100%"  }}>
                  <Grid container spacing={2} alignItems="flex-start">
                    <Grid item xs={8} sm={10} md={10}>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Mesajınızı yazınız..."
                        value={text}
                        onChange={handleInputChange}
                        onKeyDown={(e)=>{e.keyCode === 13 && handleSend()}}
                      />
                    </Grid>
                    
                    <Grid item xs={4} sm={2} md={2} >
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
  const isBot = message.sender === ((JSON.parse((window.localStorage || {}).getItem("data") || {}) .data || {}).user || {}).username;



  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isBot ? "flex-end" : "flex-start",
        mb: 2,
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          p: 1,
          backgroundColor: isBot ? "#a3b384" : "#757575",
          color: "#fff"
        }}
      >
        <Typography variant="body1">{message.text}</Typography>
      </Paper>
    </Box>
  );
};

export default ChatUI;