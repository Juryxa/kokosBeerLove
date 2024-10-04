import React, { FC, useContext, useState } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import Header from "../components/Header";
import background from "../images/Rectangle2.png";
import { Box, Button, TextField, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const EnterForm: FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { store } = useContext(Context);

    const handleSubmit = () => {
        if (isLogin) {
            store.login(email, password);
        } else {
            store.registration(email, password);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' ,marginTop:'15px'}}>
            <Header />
            <Box
                sx={{
                    backgroundImage: `url(${background})`,
                    height: '600px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    width:"1380px",
                    marginTop:'15px'
                }}
            >
                <Box
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                        borderRadius: '12px',
                        padding: '30px',
                        width: '400px',
                        textAlign: 'center',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        position: 'relative',
                    }}
                >
                    {/* Иконка закрытия */}
                    <IconButton
                        sx={{ position: 'absolute', top: 16, right: 16 }}
                        onClick={() => console.log('Close form')}
                    >
                        <CloseIcon sx={{ color: 'red' }} />
                    </IconButton>

                    <Typography variant="h5" sx={{ mb: 2, color: 'red' }}>
                        Авторизация
                    </Typography>

                    <TextField
                        fullWidth
                        sx={{ mb: 2 }}
                        label="Email"
                        variant="outlined"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />

                    <TextField
                        fullWidth
                        sx={{ mb: 2 }}
                        label="Пароль"
                        variant="outlined"
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mb: 2, backgroundColor: 'red', color: 'white' }}
                        onClick={handleSubmit}
                    >
                        {isLogin ? 'Авторизоваться' : 'Зарегистрироваться'}
                    </Button>

                    {isLogin ? (
                        <Button
                            fullWidth
                            variant="text"
                            sx={{ color: 'red' }}
                            onClick={() => setIsLogin(false)}
                        >
                            Зарегистрироваться
                        </Button>
                    ) : (
                        <Button
                            fullWidth
                            variant="text"
                            sx={{ color: 'red' }}
                            onClick={() => setIsLogin(true)}
                        >
                            Войти
                        </Button>
                    )}
                </Box>
            </Box>
        </div>
    );
};

export default observer(EnterForm);
