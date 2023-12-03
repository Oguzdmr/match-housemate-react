import React from "react";
import { Box, TextField, Grid } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Preferences from "../services/Preferences";

export default function Properties({getItems}) {
  let userPreferences = (((JSON.parse(window.localStorage.getItem('data') || '{}') || {}).data || {}).user || {}).preferences || {};
  const [gender, setGender] = React.useState(userPreferences.genderPref);
  const [pet, setPet] = React.useState(userPreferences.petsAllowed);
  const [guest, setGuest] = React.useState(userPreferences.guestsAllowed);
  const [smoke, setSmoke] = React.useState(userPreferences.smokingAllowed);
  const [alcohol, setAlcohol] = React.useState(userPreferences.alcoholAllowed);
  const [foreigner, setForeigner] = React.useState(userPreferences.foreignersAllowed);
  const [time, setTime] = React.useState(userPreferences.duration);
  const [budget, setBudget] = React.useState(userPreferences.budgetMin + '-' + userPreferences.budgetMax);
  const [minPersonCount, setMinPersonCount] = React.useState(userPreferences.acceptableRoommatesMin);
  const [maxPersonCount, setMaxPersonCount] = React.useState(userPreferences.acceptableRoommatesMax);
  const [city, setCity] = React.useState((userPreferences.address || {}).city);
  const [district, setDistrict] = React.useState((userPreferences.address || {}).district);
  const [neighborhood, setNeighborhood] = React.useState((userPreferences.address || {}).neighborhood);
  const [hasHome, setHasHome] = React.useState(userPreferences.hasHome);
  const service = new Preferences();

  const handleClickSave = async () => {
    let adress = {
      country: "Türkiye",
      city: city,
      district: district,
      neighborhood: neighborhood,
    };

    await service.updatePreferences(
      gender,
      smoke,
      guest,
      pet,
      foreigner,
      alcohol,
      time,
      minPersonCount,
      maxPersonCount,
      budget,
      hasHome,
      adress
    );
    getItems();
  };

  return (
    <div>
      <Box
        sx={{
          width: "85%",
          height: "80vh",
          margin: "2rem",
          bgcolor: "#FFFFFF",
          borderRadius: "10px",
          overflow: "auto",
        }}
      >
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "500",
                marginTop: "15px",
                color: "#313C58",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Eşleştirme Özellikleri
            </Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box sx={{ margin: "10px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label" height="30px">
                  Cinsiyet
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={gender}
                  label="Cinsiyet"
                  onChange={(e) => setGender(e.target.value)}
                  sx={{ height: "50px" }}
                >
                  <MenuItem value={0}>Erkek</MenuItem>
                  <MenuItem value={1}>Kadın</MenuItem>
                  <MenuItem value={2}>Farketmez</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Box sx={{ margin: "10px" }}>
              <TextField
                height="30px"
                fullWidth
                id="outlined-number-min"
                label="Min Kişi Sayısı"
                type="number"
                defaultValue={minPersonCount}
                onChange={(e) => setMinPersonCount(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Box sx={{ margin: "10px" }}>
              <TextField
                fullWidth
                id="outlined-number-max"
                label="Max Kişi Sayısı"
                type="number"
                defaultValue={maxPersonCount}
                onChange={(e) => setMaxPersonCount(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} lg={12}>
            <Box sx={{ margin: "10px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label" height="30px">
                  Evcil Hayvan Beslenebilir Mi ?
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={pet}
                  label="Evcil Hayvan Beslenebilir Mi ?"
                  onChange={(e) => setPet(e.target.value)}
                  sx={{ height: "50px" }}
                >
                  <MenuItem value={1}>Evet</MenuItem>
                  <MenuItem value={0}>Hayır</MenuItem>
                  <MenuItem value={2}>Tartışılabilir</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Box sx={{ margin: "10px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label" height="30px">
                  Misafir Getirilebilir Mi ?
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={guest}
                  label="Misafir Getirilebilir Mi ?"
                  onChange={(e) => setGuest(e.target.value)}
                  sx={{ height: "50px" }}
                >
                  <MenuItem value={1}>Evet</MenuItem>
                  <MenuItem value={0}>Hayır</MenuItem>
                  <MenuItem value={2}>Tartışılabilir</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box sx={{ margin: "10px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label" height="30px">
                  Sigara İçilebilir Mi ?
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={smoke}
                  label="Sigara İçilebilir Mi ?"
                  onChange={(e) => setSmoke(e.target.value)}
                  sx={{ height: "50px" }}
                >
                  <MenuItem value={1}>Evet</MenuItem>
                  <MenuItem value={0}>Hayır</MenuItem>
                  <MenuItem value={2}>Tartışılabilir</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box sx={{ margin: "10px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label" height="30px">
                  Alkol İçilebilir Mi ?
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={alcohol}
                  label="Alkol İçilebilir Mi ?"
                  onChange={(e) => setAlcohol(e.target.value)}
                  sx={{ height: "50px" }}
                >
                  <MenuItem value={1}>Evet</MenuItem>
                  <MenuItem value={0}>Hayır</MenuItem>
                  <MenuItem value={2}>Tartışılabilir</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Box sx={{ margin: "10px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label" height="30px">
                  Yabancı Olabilir Mi ?
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={foreigner}
                  label="Yabancı Olabilir Mi ?"
                  onChange={(e) => setForeigner(e.target.value)}
                  sx={{ height: "50px" }}
                >
                  <MenuItem value={1}>Evet</MenuItem>
                  <MenuItem value={0}>Hayır</MenuItem>
                  <MenuItem value={2}>Tartışılabilir</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box sx={{ margin: "10px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label" height="30px">
                  Süre
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={time}
                  label="Süre"
                  onChange={(e) => setTime(e.target.value)}
                  sx={{ height: "50px" }}
                >
                  <MenuItem value={0}>Dönemlik</MenuItem>
                  <MenuItem value={1}>Yıllık</MenuItem>
                  <MenuItem value={2}>Farketmez</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box sx={{ margin: "10px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label" height="30px">
                  Bütçe Aralığı
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={budget}
                  label="Bütçe Aralığı"
                  onChange={(e) => setBudget(((e || {}).target || {}).value || "")}
                  sx={{ height: "50px" }}
                >
                  <MenuItem value={"0-5000"}>0 - 5000</MenuItem>
                  <MenuItem value={"5000-10000"}>5000 - 10000</MenuItem>
                  <MenuItem value={"10000-15000"}>10000 - 15000</MenuItem>
                  <MenuItem value={"15000-999999"}>15000+</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box sx={{ margin: "10px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label" height="30px">
                  İl
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={city}
                  label="İl"
                  onChange={(e) => setCity(e.target.value)}
                  sx={{ height: "50px" }}
                >
                  <MenuItem value={"Ankara"}>Ankara</MenuItem>
                  <MenuItem value={"İstanbul"}>İstanbul</MenuItem>
                  <MenuItem value={"İzmir"}>İzmir</MenuItem>
                  <MenuItem value={"Samsun"}>Samsun</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box sx={{ margin: "10px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label" height="30px">
                  İlçe
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={district}
                  label="İlçe"
                  onChange={(e) => setDistrict(((e || {}).target || {}).value || {})}
                  sx={{ height: "50px" }}
                >
                  <MenuItem value={"Altındağ"}>Altındağ</MenuItem>
                  <MenuItem value={"Çankaya"}>Çankaya</MenuItem>
                  <MenuItem value={"Yenimahalle"}>Yenimahalle</MenuItem>
                  <MenuItem value={"Mamak"}>Mamak</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Box sx={{ margin: "10px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label" height="30px">
                  Mahalle
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={neighborhood}
                  label="Mahalle"
                  onChange={(e) => setNeighborhood(((e || {}).target || {}).value || {})}
                  sx={{ height: "50px" }}
                >
                  <MenuItem value={"Battalgazi"}>Battalgazi</MenuItem>
                  <MenuItem value={"Çamlık"}>Çamlık</MenuItem>
                  <MenuItem value={"Kurtuluş"}>Kurtuluş</MenuItem>
                  <MenuItem value={"Doğantepe"}>Doğantepe</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={11} lg={11}>
            <Button
              variant="contained"
              type="button"
              sx={{
                margin: "15px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#A3B484",
                "&:hover": {
                  backgroundColor: "#B0C191",
                  boxShadow: "none",
                },
              }}
              onClick={() => handleClickSave()}
            >
              Kaydet
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
