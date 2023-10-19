import React from "react";
import NavBar from "../components/NavBar";
import List from "../components/AlignItemsList";
import { Grid, Box } from "@mui/material";
import Properties from "../components/Properties";
import AuthService from "../services/AuthService";
import {useSearchParams} from "react-router-dom"

export default function ConfirmEmail() {
  const [items, setItems] = React.useState([]);
  const service = new AuthService();
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(()=> {
    return () => confirm();
  },[])
  
  const confirm = async () => {
    let _items = await service.confirmEmail(searchParams.get("user"),searchParams.get("token")).then((res)=>{
        if(res.status === 200 || res.status === 201){
            window.location.href = "/";
        }
    });
    
  }

  return (
    <div>
      Onay İşlemi Yapılıyor
    </div>
  );
}
