import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Avatar, Grid, TextField, Alert } from '@mui/material';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import userData from './user.json';
import { uploadImage } from '../../pages/adminPages/functions/uploadImage';
import AuthService from '../../api/services/AuthService';

// Определение интерфейса для пользователя
interface User {
  id: number;
  img: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  telegram: string;
}

const fieldNames: Record<keyof User, string> = {
  name: 'Имя',
  surname: 'Фамилия',
  email: 'Электронная почта',
  phone: 'Номер телефона',
  telegram: 'Телеграм',
  img: 'Аватар',
  id: 'ID'
};

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User>(userData.user[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState<string>('');
  const [showInput, setShowInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (field: keyof User, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

const handleImageEditing = async ()=>{
  if(showInput){
   try {
        await AuthService.profileEdit(
          user.name,
          user.surname,
          user.phone,
          user.telegram,
          image || user.img
        );

        setSuccessMessage('Профиль успешно обновлен!');
        setErrorMessage(null);
      } catch (error) {
        console.error('Ошибка при обновлении профиля:', error);
        setErrorMessage('Произошла ошибка при обновлении профиля.');
        setSuccessMessage(null);
      }
    }
  
    setShowInput(!showInput);
  }
  
  



  const handleEditToggle = async () => {
    if (isEditing) {
      // При завершении редактирования отправляем запрос на обновление данных профиля
      try {
        await AuthService.profileEdit(
          user.name,
          user.surname,
          user.phone,
          user.telegram,
          image || user.img
        );

        setSuccessMessage('Профиль успешно обновлен!');
        setErrorMessage(null);
      } catch (error) {
        console.error('Ошибка при обновлении профиля:', error);
        setErrorMessage('Произошла ошибка при обновлении профиля.');
        setSuccessMessage(null);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      try {
        const imageUrl = await uploadImage(file, setSuccessMessage, setErrorMessage, 'user_avatar');
        if (imageUrl) {
          setImage(imageUrl);
          setSuccessMessage('Изображение успешно загружено!');
          setErrorMessage(null);
        }
      } catch (error) {
        setErrorMessage('Ошибка при загрузке изображения.');
        setSuccessMessage(null);
      }
    } else {
      setErrorMessage('Пожалуйста, загрузите изображение в формате PNG или JPEG.');
    }
  };

  return (
    <>
    <div style={{ height: '100%' }}>
      <Header />
      <div style={{ height: '100vh' }}>
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" p={3} sx={{ width: '100%' ,padding:"-24px"}}>
          <Grid container spacing={2} justifyContent="center" maxWidth="lg">
            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: 'center', padding: 2, backgroundColor: '#ffffff' }}>
                <Avatar
                  sx={{ width: 120, height: 120, margin: '0 auto 16px auto' }}
                  src={image || user.img}
                  alt="Profile Image"
                />

                <Button style={{ margin: "15px" }} variant="outlined"  color="error" onClick={handleImageEditing}>
                  {showInput ? 'Сохранить' : 'Загрузить аватар'}
                </Button>

                {showInput && (
                  <input style={{ margin: "15px" }} type="file" onChange={handleFileChange}  accept="image/*" />
                )}

                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                {successMessage && <Alert severity="success">{successMessage}</Alert>}

                <Typography variant="h5" gutterBottom>
                  {user?.name} {user?.surname}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Kokos fan
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} md={8}>
              <Card sx={{ padding: 2, backgroundColor: '#ffffff' }}>
                <CardContent>
                  {(['name', 'surname', 'email', 'phone', 'telegram'] as Array<keyof User>).map((field) => (
                    <Box key={field} mb={2}>
                      <Typography variant="h6" gutterBottom>
                        {fieldNames[field]}
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

                  <Button variant="contained" color="error" onClick={handleEditToggle}>
                    {isEditing ? 'Сохранить' : 'Редактировать'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </div>
      
    </div>
    <Footer />
    </>
  );
};

export default UserProfile;
