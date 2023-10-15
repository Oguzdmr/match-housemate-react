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
  const [birthdayValue, setBirthdayValue] = React.useState("");
  const [gender, setGender] = React.useState("");

  const handleChange = (newFile) => {
    let file = newFile;
    let reader = new FileReader();
    reader.onload = function () {
      setFile(reader.result.replace("data:", "").replace(/^.+,/, ""));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData((event || {}).currentTarget || "");
    let genderValue = gender === "Erkek" ? 0 : 1;

    if (gender === "Farketmez") {
      genderValue = 2;
    }

    let birthDayRaw = moment(new Date(birthdayValue)).format("YYYY-MM-DD");

    const service = new AuthService();
    await service
      .register(
        data.get("firstName") || "",
        data.get("lastName") || "",
        data.get("email") || "",
        data.get("userName") || "" ,
        data.get("password") || "",
        birthDayRaw,
        genderValue,
        file
      ).then((res) => {
        if (res.status === 200) {
          window.location.href = "/login";
        }
      });
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
            Sign up
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
                  label="First Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
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

                    <MenuItem value={"Erkek"}>Erkek</MenuItem>
                    <MenuItem value={"Kadın"}>Kadın</MenuItem>
                    <MenuItem value={"Farketmez"}>Farketmez</MenuItem>
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
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>

              <Grid item xs={12}>
                <MuiFileInput
                  value={file}
                  label="Profil Fotoğrafı"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
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
