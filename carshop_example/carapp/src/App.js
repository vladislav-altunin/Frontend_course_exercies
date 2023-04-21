import logo from './logo.svg';
import './App.css';
import Carlist from './components/Carlist';

/* App Bar imports */
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <div className="App" style={{ maxWidth: '1200px' }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">CarShop</Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Carlist />
    </div>
  );
}

export default App;
