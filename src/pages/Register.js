import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MuiFileInput } from "mui-file-input";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AuthService from "../services/AuthService";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from "moment";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


const defaultTheme = createTheme();

export default function Register() {
  const [file, setFile] = React.useState("");
  const [fileCheck, setFileCheck] = React.useState();
  const [birthdayValue, setBirthdayValue] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [check, setCheck] = React.useState(false);

  const handleChange = (newFile) => {
    let file = newFile;
    setFileCheck(file)
    let reader = new FileReader();
    reader.onload = function () {
      setFile(reader.result.replace("data:", "").replace(/^.+,/, ""));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData((event || {}).currentTarget || "");

    let birthDayRaw = moment(new Date(birthdayValue)).format("YYYY-MM-DD");
    console.log(gender);
    const service = new AuthService();
    if(check){
      await service
      .register(
        data.get("firstName") || "",
        data.get("lastName") || "",
        data.get("email") || "",
        data.get("userName") || "" ,
        data.get("password") || "",
        birthDayRaw,
        parseInt(gender),
        file
      ).then((res) => {
        if (res.status === 200) {
          window.location.href = "/login";
        }
      });
    }
    
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>

          <Avatar sx={{ m: 1, bgcolor: "#A3B484" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Kayıt Ol
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="İsim"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Soyisim"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id="demo-simple-select-helper-label"
                    height="30px">
                    Cinsiyet
                  </InputLabel>

                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="gender"
                    value={gender}
                    label="Cinsiyet"
                    onChange={(e) => setGender(e.target.value)}
                    sx={{ height: "50px" }}>

                    <MenuItem value={"0"}>Erkek</MenuItem>
                    <MenuItem value={"1"}>Kadın</MenuItem>
                    <MenuItem value={"2"}>Farketmez</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="Kullanıcı Adı"
                  name="userName"
                  autoComplete="family-name"
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                  <DemoContainer fullWidth components={["DatePicker"]}>
                    <DatePicker
                      fullWidth
                      slotProps={{ textField: { fullWidth: true } }}
                      id="birthday"
                      onChange={(e) => setBirthdayValue(e)}
                      label="Doğum Günü"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Adresi"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Şifre"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>

              <Grid item xs={12}>
                {fileCheck == null ? (
                  <MuiFileInput
                  value={file}
                  label="Profil Fotoğrafı"
                  onChange={handleChange}
                />
                ):(
                  <List>
                     <ListItem
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={()=>{setFile("");setFileCheck(null)}} >
                          <DeleteIcon/>
                        </IconButton>
                      }
                    >
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={fileCheck.name}
                    />
                    </ListItem>,
                  </List>
                )}
                
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" onChange={()=>setCheck(!check)} color="primary" />
                  }
                  label="Hizmet koşullarını kabul ediyorum."
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Kayıt Ol
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Zaten bir hesabın var mı? Giriş Yap
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
