import React from 'react';
import { Box, Card, CardContent, Typography, Button, Avatar, Grid } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

const UserProfile: React.FC = () => {
  return (
    <div style={{ height: "100vh", backgroundColor: '#f0f4f8' }}>
      <Header />
      <div style={{ height: "77vh" }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          p={3}
          sx={{ backgroundColor: '#f0f4f8', width: '100%' }}
        >
          <Grid container spacing={2} justifyContent="center" maxWidth="lg">
            {/* Левая панель профиля */}
            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: 'center', padding: 2, backgroundColor: '#ffffff' }}>
                <Avatar
                  sx={{ width: 120, height: 120, margin: '0 auto 16px auto' }}
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  alt="Profile Image"
                />
                <Typography variant="h5" gutterBottom>
                  John Doe
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Kokos fan
                </Typography>
                
                
              </Card>

              {/* Социальные сети */}
              <Card sx={{ marginTop: 2, backgroundColor: '#ffffff' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                    <Typography variant="body1" fontWeight="bold">
                      Website
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      https://bootdey.com
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                    <Typography variant="body1" fontWeight="bold">
                      Github
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      bootdey
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                    <Typography variant="body1" fontWeight="bold">
                      Twitter
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      @bootdey
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                    <Typography variant="body1" fontWeight="bold">
                      Instagram
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      bootdey
                    </Typography>
                  </Box>
                  
                </CardContent>
              </Card>
            </Grid>

            {/* Правая панель с информацией */}
            <Grid item xs={12} md={8} >
              <Card sx={{ padding: 2, backgroundColor: '#ffffff' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Full Name
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Kenneth Valdez
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Email
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    fip@jukmuh.al
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Phone
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    (239) 816-9029
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Mobile
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    (320) 380-4539
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Address
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Bay Area, San Francisco, CA
                  </Typography>
                  <Box mt={2}>
                    <Button variant="contained" color="primary">
                      Edit
                    </Button>
                  </Box>
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
