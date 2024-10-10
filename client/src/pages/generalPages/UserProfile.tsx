import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Avatar, Grid, TextField } from '@mui/material';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import userData from './user.json';

// Определите интерфейс для пользователя
interface User {
  id: number;
  img: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  telegram: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User>(userData.user[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState<string>(''); 
  const [showInput, setShowInput] = useState(false); // Состояние для показа input

  const handleInputChange = (field: keyof User, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string); // обновляем аватарку
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ height: '100vh', backgroundColor: '#f0f4f8' }}>
      <Header />
      <div style={{ height: '77vh' }}>
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" p={3} sx={{ backgroundColor: '#f0f4f8', width: '100%' }}>
          <Grid container spacing={2} justifyContent="center" maxWidth="lg">
            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: 'center', padding: 2, backgroundColor: '#ffffff' }}>
                <Avatar
                  sx={{ width: 120, height: 120, margin: '0 auto 16px auto' }}
                  src={avatar || user.img} // Показываем новый аватар или аватар из данных
                  alt="Profile Image"
                />
                
                {/* Кнопка для показа input */}
                <Button  style={{margin:"15px"}} variant="outlined" color="error" onClick={() => setShowInput(!showInput)}>
                  {showInput ? 'Сохранить' : 'Загрузить аватар'}
                </Button>
                
                {/* Input для загрузки аватарки */}
                {showInput && (
                  <input style={{margin:"15px"}} type="file" onChange={handleAvatarChange} accept="image/*" />
                )}
                
                <Typography variant="h5" gutterBottom>
                  {user?.name} {user?.surname}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Kokos fan
                </Typography>
              </Card>
            </Grid>

            {/* Правая панель с информацией */}
            <Grid item xs={12} md={8}>
              <Card sx={{ padding: 2, backgroundColor: '#ffffff' }}>
                <CardContent>
                  {(['name', 'surname', 'email', 'phone', 'telegram'] as Array<keyof User>).map((field) => (
                    <Box key={field} mb={2}>
                      <Typography variant="h6" gutterBottom>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </Typography>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          variant="outlined"
                          value={user[field]}
                          onChange={(e) => handleInputChange(field, e.target.value)}
                        />
                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          {user[field]}
                        </Typography>
                      )}
                    </Box>
                  ))}
                  <Button variant="contained" color="error" onClick={handleEditToggle}> {/* Цвет кнопки изменен на красный */}
                    {isEditing ? 'Сохранить' : 'Редактировать'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
