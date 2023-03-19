import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent  from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid'
import Thunderstorm from '@mui/icons-material/Thunderstorm';
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();



export default function App() {
  let items=['Item 1','Item 2','Item 3','Item 4','Item 5'];
  let itemsList = items.map((item)=>{
    return (
      <Card>
        <CardHeader
          style={{textAlign:'center'}}
          title={item}
        />
        <CardContent>
          This is {item}.
        </CardContent>
      </Card>
    )
  })
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
          <Typography variant="h5" color="initial">
            Weather App
          </Typography>
          <Typography variant="h5" color="initial">
            Today's Weather
          </Typography>
          <Grid
            sx={{m:4}}
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

