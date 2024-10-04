import React from 'react';
import {AppBar, Toolbar, IconButton, MenuItem, Menu, Typography, Box, Switch} from "@mui/material";
import {Facebook, YouTube, Telegram, WhatsApp} from '@mui/icons-material';
import {SvgIcon, SvgIconProps} from '@mui/material';
import {Link} from 'react-router-dom';


const Header = () => {
    const [language, setLanguage] = React.useState<'Рус.' | 'Eng.'>('Рус.');
    const VkIcon = (props: SvgIconProps) => (
        <SvgIcon {...props} viewBox="0 0 24 24">
            <path
                d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.435 15h-1.206c-.69 0-.792-.524-1.341-1.044-.68-.654-1.059-.76-1.243-.76-.132 0-.314.063-.314.428v.968c0 .26-.073.408-.67.408-1.057 0-2.25-.708-3.15-2.03C7.142 12.89 6.75 11.203 6.75 11.203c-.09-.263.017-.524.396-.524h1.202c.35 0 .48.16.552.338 0 0 .685 1.617 1.55 2.658.26.28.444.362.606.362.132 0 .188-.078.188-.367v-1.13c-.02-.734-.422-.795-.422-1.137 0-.09.07-.18.175-.18h2.026c.29 0 .34.13.32.387v1.395c0 .22.1.287.314.287.21 0 .417-.116.825-.547.66-.696 1.154-1.804 1.154-1.804.138-.263.28-.33.53-.33h1.202c.34 0 .494.16.417.47-.173.702-1.2 2.34-2.34 3.28-.46.41-.64.63-.64.98 0 .37.257.433.636.433h1.148c.525 0 .687.158.573.47-.263.795-1.89.87-2.866.87z"/>
        </SvgIcon>
    );
    const handleLanguageChange = () => {
        setLanguage((prev) => (prev === 'Рус.' ? 'Eng.' : 'Рус.'));
    };

    return (
        <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div className='HighLine' style={{
                width: "1380px",
                backgroundColor: 'red',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '10px',
                marginBottom: '1', // Убедитесь, что отступ снизу равен 0
                marginTop:'1'
            }}>
              <div className='Highline_Elements' style={{
                  width: "1140px",

                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between"
              }}>
                {/* Язык и Тема */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Switch color="default" />
                  <Typography>Язык:</Typography>
                  <MenuItem onClick={handleLanguageChange}>{language}</MenuItem>
                </Box>
                {/* Социальные сети */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton color="inherit"><Facebook /></IconButton>
                  <IconButton color="inherit"><YouTube /></IconButton>
                  <IconButton color="inherit"><Telegram /></IconButton>
                  <IconButton color="inherit"><WhatsApp /></IconButton>
                  <IconButton color="inherit"><VkIcon /></IconButton>
                </Box>
              </div>
            </div>
            <div className='LowLine' style={{
               border: '2px solid red',
               borderRadius: '15px',
               boxShadow: '0 0 3px rgba(0, 0, 0, 0.2)',



                width: "1380px",

                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '0', // Убедитесь, что отступ сверху равен 0
                padding: '10px',

            }}>
              {/* Логотип */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton component={Link} to="/" sx={{ padding: 0 }}>
                  <img src="images/image1.png" alt="Logo" style={{ height: '30px' }} />
                </IconButton>
              </Box>
              {/* Навигация */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <MenuItem component={Link} to="/matches">Матчи</MenuItem>
              <MenuItem component={Link} to="/news">Новости</MenuItem>
              <MenuItem component={Link} to="/about">О клубе</MenuItem>
              <MenuItem component={Link} to="/team">Команда</MenuItem>
              <MenuItem component={Link} to="/shop">Магазин</MenuItem>
              <MenuItem component={Link} to="/contacts">Контакты</MenuItem>

              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto',color:"white" }}>
                <IconButton ><Typography >Search</Typography></IconButton>
                <IconButton component={Link} to="/enter"><Typography>Login</Typography></IconButton>
              </Box>
            </div>
          </div>
        </Toolbar>
      </AppBar>

    );
};

export default Header;