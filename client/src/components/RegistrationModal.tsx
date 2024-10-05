import React, { useState, useContext } from 'react';
import { Modal, Box, Button, TextField, Typography, IconButton } from '@mui/material';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import CloseIcon from '@mui/icons-material/Close';

const RegistrationModal: React.FC<{ open: boolean, handleClose: () => void }> = ({ open, handleClose }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const { store } = useContext(Context);

  const handleSubmit = () => {
    if (isLogin) {
      store.login(email, password);
    } else {
      if (password !== confirmPassword) {
        alert("Пароли не совпадают!");
        return;
      }
      store.registration(email, password);
    }
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)', // Прозрачность контейнера
          borderRadius: '12px',
          padding: '30px',
          width: '400px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: "red"
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" sx={{ mb: 2, color: '#E62526', fontSize: "30px" }}>
          {isLogin ? "Вход" : "Регистрация"}
        </Typography>

        {!isLogin && (
          <TextField
            sx={{
              mb: 2, height: "51px", width: "300px",borderRadius: '12px',
              // Убираем прозрачность у инпутов
              backgroundColor: 'white',
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#E62526', borderWidth: '3px', borderRadius: '12px' },
                '&:hover fieldset': { borderColor: '#E62526', borderWidth: '3px', borderRadius: '12px' },
                '&.Mui-focused fieldset': { borderColor: '#E62526', borderWidth: '3px', borderRadius: '12px' },
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
            mb: 2, height: "51px", width: "300px",borderRadius: '12px',
            backgroundColor: 'white', // Убираем прозрачность у инпутов
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#E62526', borderWidth: '3px', borderRadius: '12px' },
              '&:hover fieldset': { borderColor: '#E62526', borderWidth: '3px', borderRadius: '12px' },
              '&.Mui-focused fieldset': { borderColor: '#E62526', borderWidth: '3px', borderRadius: '12px' },
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
            mb: 2, height: "51px", width: "300px",borderRadius: '12px',
            backgroundColor: 'white', // Убираем прозрачность у инпутов
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#E62526', borderWidth: '3px', borderRadius: '12px' },
              '&:hover fieldset': { borderColor: '#E62526', borderWidth: '3px', borderRadius: '12px' },
              '&.Mui-focused fieldset': { borderColor: '#E62526', borderWidth: '3px', borderRadius: '12px' },
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

        {!isLogin && (
          <TextField
            sx={{
              mb: 2, height: "51px", width: "300px",borderRadius: '12px',
              backgroundColor: 'white', // Убираем прозрачность у инпутов
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#E62526', borderWidth: '3px', borderRadius: '12px' },
                '&:hover fieldset': { borderColor: '#E62526', borderWidth: '3px', borderRadius: '12px' },
                '&.Mui-focused fieldset': { borderColor: '#E62526', borderWidth: '3px', borderRadius: '12px' },
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
                    sx={{
                        mb: 2,
                        backgroundColor: '#E62526',
                        color: 'white',
                        borderRadius: '12px',
                        height: "51px",
                        width: "300px"
                    }}
                    onClick={handleSubmit}
                >
                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </Button>

        {isLogin ? (
          <Button
            variant="text"
            sx={{
              mb: 2,
              backgroundColor: '#E62526',
              color: 'white',
              borderRadius: '12px',
              height: "51px",
              width: "300px"
            }}
            onClick={() => setIsLogin(false)}
          >
            Зарегистрироваться
          </Button>
        ) : (
          <Button
            variant="text"
            sx={{
              mb: 2,
              backgroundColor: '#E62526',
              color: 'white',
              borderRadius: '12px',
              height: "51px",
              width: "300px"
            }}
            onClick={() => setIsLogin(true)}
          >
            Войти в аккаунт
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default observer(RegistrationModal);
