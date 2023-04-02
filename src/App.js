import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent  from '@mui/material/CardContent';
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Thunderstorm from '@mui/icons-material/Thunderstorm';
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();



export default function App() {

  const [apiCurrentData, setApiCurrentData] = useState({});
  const [apiForecastData, setApiForecastData] = useState({});
  const [getCity, setgetCity] = useState('okinawa');
  const [city, setCity] = useState('okinawa');

  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const apiUrlForecast = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}`;

  const inputHandler = (event) => {
    setgetCity(event.target.value);
  };

  const submitHandler = () => {
    setCity(getCity);
  };

  const kelvinToCelsius = (k) => {
    return (k - 273.15).toFixed(2);
  };

  const handleEnterKey = (event) => {
    if (event.keyCode === 13) {
      submitHandler();
    }
  };

  useEffect(() => {
    fetch(apiUrlCurrent)
    .then((response) => response.json())
    .then((data) => setApiCurrentData(data));

    fetch(apiUrlForecast)
    .then((response) => response.json())
    .then((data) => setApiForecastData(data));

  }, [apiUrlCurrent, apiUrlForecast])


  let items=[0,8,16,24,32];
  let itemsList = apiForecastData.list ? items.map((item)=>{
    return (
      <Card
        style={{textAlign:'center'}}
      >
        <CardContent>
          <Typography variant="h5">
            {apiForecastData.list[item]?.dt_txt?.slice(5,7)+'/'+apiForecastData.list[item]?.dt_txt?.slice(8,10)}
          </Typography>
          <img
              src={`http://openweathermap.org/img/w/${apiForecastData.list[item]?.weather[0]?.icon}.png`}
              alt={'weather '+item+' icon'}
            />
          <Typography variant="h6">
            {apiForecastData.list[item]?.weather[0]?.main}
          </Typography>
          <Typography variant="body1">
            High: {kelvinToCelsius(apiForecastData.list[item]?.main?.temp_max)}&deg;C
          </Typography>
          <Typography variant="body1">
            Low: {kelvinToCelsius(apiForecastData.list[item]?.main?.temp_min)}&deg;C
          </Typography>
        </CardContent>
      </Card>
    )
  }) : null;

  let searchBar = (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      padding: '16px',
      background: 'none',
      boxShadow: 'none',
    }}
  >
      <TextField
        id="search-bar"
        label="Search City"
        variant="outlined"
        size="small"
        style={{ marginRight: '8px' }}
        onChange={inputHandler}
        value={getCity}
        onKeyDown={handleEnterKey}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={submitHandler}
        disableElevation
      >
        Search
      </Button>
    </Card>
  )

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Card
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: '16px',
            }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <Thunderstorm/>
          </Avatar>
          <Typography variant="h5" color="initial" style={{textAlign: 'center'}}>
            Weather App
            <br/>
          {searchBar}
            {apiCurrentData.name + ", " + apiCurrentData.sys?.country}
          </Typography>
          {apiCurrentData.main ? (
            <Typography variant="h5" color="initial" style={{textAlign: 'center'}}>
              <img
                src={`http://openweathermap.org/img/w/${apiCurrentData.weather[0]?.icon}.png`}
                alt= "weather current icon"
                style={{height: '100px'}}
              />
              <br/>
              {kelvinToCelsius(apiCurrentData.main?.temp)}&deg;C
              <br/>
              High: {kelvinToCelsius(apiCurrentData.main?.temp_max)}&deg;C
              <br/>
              Low: {kelvinToCelsius(apiCurrentData.main?.temp_min)}&deg;C
            </Typography>
          ) : (
            null
          )}
          <Typography variant="h5" color="initial" style={{marginTop:10}}>
            Five Day Forecast
          </Typography>
          <Grid
            sx={{m:4, gap: 2, mt: 0}}
            container
            spacing={2}
            columns={5}
            alignItems="center"
            justifyContent="center"
          >
            {itemsList}
          </Grid>
        </Card>
      </Container>
    </ThemeProvider>
  );
}
