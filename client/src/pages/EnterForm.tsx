import React, { FC, useContext, useState } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import Header from "../components/Header";
import background from "../images/Rectangle2.png";
import { Box, Button, TextField, Typography  } from '@mui/material';
import '../index.css';

const EnterForm: FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>(''); // Поле для имени при регистрации
    const [confirmPassword, setConfirmPassword] = useState<string>(''); // Подтверждение пароля
    const { store } = useContext(Context);


   


    const handleSubmit = () => {
        if (isLogin) {
            store.login(email, password);
        } else {
            if (password !== confirmPassword) {
                alert("Пароли не совпадают!");
                return;
            }
            store.registration(email, password); // Передаём имя при регистрации
        }
    };

    return (
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '15px' }}>
            <Header />
            <Box
                sx={{
                    backgroundImage: `url(${background})`,
                    height: '600px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    width: "1380px",
                    marginTop: '15px'
                }}
            >
                <Box
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '12px',
                        padding: '30px',
                        width: '400px',
                        textAlign: 'center',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        position: 'relative',
                        display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'

                    }}
                >
                    <Typography variant="h5" sx={{ mb: 2, color: '#E62526', fontSize: "30px" }}>
                        {isLogin ? "Авторизация" : "Регистрация"}
                    </Typography>

                    {/* Поле для имени, отображается только при регистрации */}
                    {!isLogin && (
                        <TextField
                            
                            sx={{
                                mb: 2,height:"51px",width:"300px",
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#E62526',borderWidth: '3px', borderRadius: '12px',},
                                    '&:hover fieldset': { borderColor: '#E62526',borderWidth: '3px', borderRadius: '12px',},
                                    '&.Mui-focused fieldset': { borderColor: '#E62526',borderWidth: '3px', borderRadius: '12px',},
                                },
                                '& .MuiInputLabel-root': { color: '#E62526' },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#E62526' }
                            }}
                            label="Имя"
                            variant="outlined"
                            onChange={e => setName(e.target.value)}
                            value={name}
                        />
                    )}

                    <TextField
                        
                        sx={{
                            mb: 2,height:"51px",width:"300px",
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#E62526',borderWidth: '3px', borderRadius: '12px',},
                                '&:hover fieldset': { borderColor: '#E62526',borderWidth: '3px', borderRadius: '12px,'},
                                '&.Mui-focused fieldset': { borderColor: '#E62526',borderWidth: '3px', borderRadius: '12px'},
                            },
                            '& .MuiInputLabel-root': { color: '#E62526' },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#E62526' }
                        }}
                        label="Email"
                        variant="outlined"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />

                    <TextField
                        
                        sx={{
                            mb: 2,height:"51px",width:"300px",
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#E62526',borderWidth: '3px', borderRadius: '12px',},
                                '&:hover fieldset': { borderColor: '#E62526',borderWidth: '3px', borderRadius: '12px',},
                                '&.Mui-focused fieldset': { borderColor: '#E62526',borderWidth: '3px', borderRadius: '12px',},
                            },
                            '& .MuiInputLabel-root': { color: '#E62526' },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#E62526' }
                        }}
                        label="Пароль"
                        variant="outlined"
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />

                    {/* Поле подтверждения пароля, отображается только при регистрации */}
                    {!isLogin && (
                        <TextField
                            
                            sx={{
                                mb: 2,height:"51px",width:"300px",
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#E62526',borderWidth: '3px', borderRadius: '12px',},
                                    '&:hover fieldset': { borderColor: '#E62526',borderWidth: '3px', borderRadius: '12px',},
                                    '&.Mui-focused fieldset': { borderColor: '#E62526',borderWidth: '3px', borderRadius: '12px',},
                                },
                                '& .MuiInputLabel-root': { color: '#E62526' },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#E62526' }
                            }}
                            label="Подтвердите пароль"
                            variant="outlined"
                            type="password"
                            onChange={e => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                        />
                    )}

                    <Button
                        
                        variant="contained"
                        sx={{ mb: 2, backgroundColor: '#E62526', color: 'white',borderRadius: '12px',height:"51px",width:"300px"}}
                        onClick={handleSubmit}
                    >
                        {isLogin ? 'Авторизоваться' : 'Зарегистрироваться'}
                    </Button>

                    {isLogin ? (
                        <Button
                            
                            variant="text"
                            sx={{ mb: 2, backgroundColor: '#E62526',color: 'white',borderRadius: '12px',height:"51px",width:"300px" }}
                            onClick={() => setIsLogin(false)}
                        >
                            Зарегистрироваться
                        </Button>
                    ) : (
                        <Button
                            
                            variant="text"
                            sx={{ mb: 2, backgroundColor: '#E62526',color: 'white',borderRadius: '12px',height:"51px",width:"300px" }}
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
