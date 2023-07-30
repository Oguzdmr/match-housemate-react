import React from 'react'
import { Box,TextField, Grid } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Properties() {
    const [gender, setGender] = React.useState('');
    const [pet, setPet] = React.useState('');
    const [guest, setGuest] = React.useState('');
    const [smoke, setSmoke] = React.useState('');
    const [alcohol, setAlcohol] = React.useState('');
    const [foreigner, setForeigner] = React.useState('');
    const [time, setTime] = React.useState('');
    const [budget, setBudget] = React.useState('');
    const [personCount, setPersonCount] = React.useState('');
    const [city, setCity] = React.useState('');
    const [district, setDistrict] = React.useState('');

  return (
    <div>
        <Box sx={{ width: '85%', height:'80vh' ,margin:'2rem',  bgcolor:'#EDEDFE', borderRadius:'10px', overflow:'auto'  }}>
        <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
        <Typography
                sx={{
                    fontSize:'20px',
                    fontWeight:'500',
                    marginTop:'15px',
                    color:'#0425AD',
                    display:'flex',
                    justifyContent:"center",
                    alignItems:"center"
                }}
            >
                Eşleştirme Özellikleri
              </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
            <Box sx={{margin:'10px'}}>
            <FormControl fullWidth >
                <InputLabel id="demo-simple-select-helper-label" height='30px'>Cinsiyet</InputLabel>
                <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={gender}
                label="Cinsiyet"
                onChange={(e)=>setGender(e.target.value)}
                sx={{height:'50px'}}
                >
                <MenuItem value={10}>Erkek</MenuItem>
                <MenuItem value={20}>Kadın</MenuItem>
                <MenuItem value={30}>Farketmez</MenuItem>
                </Select>
                
            </FormControl>
            </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
            <Box sx={{margin:'10px'}}>
            <FormControl fullWidth >
                <InputLabel id="demo-simple-select-helper-label" height='30px'>Kişi Sayısı</InputLabel>
                <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={personCount}
                label="Kişi Sayısı"
                onChange={(e)=>setPersonCount(e.target.value)}
                sx={{height:'50px'}}
                >
                <MenuItem value={10}>1</MenuItem>
                <MenuItem value={20}>2</MenuItem>
                <MenuItem value={30}>3</MenuItem>
                <MenuItem value={40}>4+</MenuItem>
                </Select>
                
            </FormControl>
            </Box>
        </Grid>
        <Grid item xs={12} lg={12}>
            <Box sx={{margin:'10px'}}>
            <FormControl fullWidth >
                <InputLabel id="demo-simple-select-helper-label" height='30px'>Evcil Hayvan Beslenebilir Mi ?</InputLabel>
                <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={pet}
                label="Evcil Hayvan Beslenebilir Mi ?"
                onChange={(e)=>setPet(e.target.value)}
                sx={{height:'50px'}}
                >
                <MenuItem value={10}>Evet</MenuItem>
                <MenuItem value={20}>Hayır</MenuItem>
                <MenuItem value={30}>Tartışılabilir</MenuItem>
                </Select>
                
            </FormControl>
            </Box>
        </Grid>
        <Grid item xs={12} lg={12}>
            <Box sx={{margin:'10px'}}>
            <FormControl fullWidth >
                <InputLabel id="demo-simple-select-helper-label" height='30px'>Misafir Getirilebilir Mi ?</InputLabel>
                <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={guest}
                label="Misafir Getirilebilir Mi ?"
                onChange={(e)=>setGuest(e.target.value)}
                sx={{height:'50px'}}
                >
                <MenuItem value={10}>Evet</MenuItem>
                <MenuItem value={20}>Hayır</MenuItem>
                <MenuItem value={30}>Tartışılabilir</MenuItem>
                </Select>
                
            </FormControl>
            </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
            <Box sx={{margin:'10px'}}>
            <FormControl fullWidth >
                <InputLabel id="demo-simple-select-helper-label" height='30px'>Sigara İçilebilir Mi ?</InputLabel>
                <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={smoke}
                label="Sigara İçilebilir Mi ?"
                onChange={(e)=>setSmoke(e.target.value)}
                sx={{height:'50px'}}
                >
                <MenuItem value={10}>Evet</MenuItem>
                <MenuItem value={20}>Hayır</MenuItem>
                <MenuItem value={30}>Tartışılabilir</MenuItem>
                </Select>
                
            </FormControl>
            </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
            <Box sx={{margin:'10px'}}>
            <FormControl fullWidth >
                <InputLabel id="demo-simple-select-helper-label" height='30px'>Alkol İçilebilir Mi ?</InputLabel>
                <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={alcohol}
                label="Alkol İçilebilir Mi ?"
                onChange={(e)=> setAlcohol(e.target.value)}
                sx={{height:'50px'}}
                >
                <MenuItem value={10}>Evet</MenuItem>
                <MenuItem value={20}>Hayır</MenuItem>
                <MenuItem value={30}>Tartışılabilir</MenuItem>
                </Select>
                
            </FormControl>
            </Box>
        </Grid>
        <Grid item xs={12} lg={12}>
            <Box sx={{margin:'10px'}}>
            <FormControl fullWidth >
                <InputLabel id="demo-simple-select-helper-label" height='30px'>Yabancı Olabilir Mi ?</InputLabel>
                <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={foreigner}
                label="Yabancı Olabilir Mi ?"
                onChange={(e)=>setForeigner(e.target.value)}
                sx={{height:'50px'}}
                >
                <MenuItem value={10}>Evet</MenuItem>
                <MenuItem value={20}>Hayır</MenuItem>
                <MenuItem value={30}>Tartışılabilir</MenuItem>
                </Select>
                
            </FormControl>
            </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
            <Box sx={{margin:'10px'}}>
            <FormControl fullWidth >
                <InputLabel id="demo-simple-select-helper-label" height='30px'>Süre</InputLabel>
                <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={time}
                label="Süre"
                onChange={(e)=> setTime(e.target.value)}
                sx={{height:'50px'}}
                >
                <MenuItem value={10}>Dönemlik</MenuItem>
                <MenuItem value={20}>Yıllık</MenuItem>
                <MenuItem value={30}>Farketmez</MenuItem>
                </Select>
                
            </FormControl>
            </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
            <Box sx={{margin:'10px'}}>
            <FormControl fullWidth >
                <InputLabel id="demo-simple-select-helper-label" height='30px'>Bütçe Aralığı</InputLabel>
                <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={budget}
                label="Bütçe Aralığı"
                onChange={(e)=> setBudget(e.target.value)}
                sx={{height:'50px'}}
                >
                <MenuItem value={10}>0 - 5000</MenuItem>
                <MenuItem value={20}>5000 - 10000</MenuItem>
                <MenuItem value={30}>10000 - 15000</MenuItem>
                <MenuItem value={40}>15000+</MenuItem>
                </Select>
                
            </FormControl>
            </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
            <Box sx={{margin:'10px'}}>
            <FormControl fullWidth >
                <InputLabel id="demo-simple-select-helper-label" height='30px'>İl</InputLabel>
                <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={city}
                label="İl"
                onChange={(e)=> setCity(e.target.value)}
                sx={{height:'50px'}}
                >
                <MenuItem value={10}>Ankara</MenuItem>
                <MenuItem value={20}>İstanbul</MenuItem>
                <MenuItem value={30}>İzmir</MenuItem>
                <MenuItem value={40}>Samsun</MenuItem>
                </Select>
                
            </FormControl>
            </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
            <Box sx={{margin:'10px'}}>
            <FormControl fullWidth >
                <InputLabel id="demo-simple-select-helper-label" height='30px'>İlçe</InputLabel>
                <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={district}
                label="İlçe"
                onChange={(e)=> setDistrict(e.target.value)}
                sx={{height:'50px'}}
                >
                <MenuItem value={10}>Altındağ</MenuItem>
                <MenuItem value={20}>Çankaya</MenuItem>
                <MenuItem value={30}>Yenimahalle</MenuItem>
                <MenuItem value={40}>Mamak</MenuItem>
                </Select>
                
            </FormControl>
            </Box>
        </Grid>
        <Grid item xs={12} lg={12}>
            <Button variant="contained"  
                    sx={{
                    margin:'15px',
                    width:'100%',
                    display:'flex',
                    justifyContent:"center",
                    alignItems:"center"
                }}>Kaydet</Button>
        </Grid>
        

      </Grid>
            
           
            
        </Box>

    </div>
  )
}
