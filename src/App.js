import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Messages from "./pages/Messages";
import Favorites from "./pages/Favorites";
import ConfirmEmail from "./pages/ConfirmEmail";
import React from "react";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import * as signalR from '@microsoft/signalr';

const config  = require("./config")

function App() {

  React.useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem('data'));
    if ((!userData || !userData.data || !userData.data.accessToken) && window.location.href.indexOf('login') === -1 &&
      window.location.href.indexOf('register') === -1) {
      window.location.href = '/login';
    }


    return () => connectionBuild();
  },[]);

  const connectionBuild = () => {
    if(window.location.href.indexOf('login') === -1 &&  window.location.href.indexOf('register') === -1){
      window.connection = new signalR.HubConnectionBuilder().withUrl(config.baseUrl + "/chat", {
        accessTokenFactory: ()=> (JSON.parse((localStorage || {}).getItem('data') || {}).data || "{}").accessToken || "" 
      }).build();
  
      window.connection.start().then(function () {
        console.log("SignalR ile bağlantı kuruldu.");
      }).catch(function (err) {
          return console.error(err.toString());
      });
    }
  }

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/confirmEmail" element={<ConfirmEmail />} />
      </Routes>
    </Router>
  );
}

export default App;
