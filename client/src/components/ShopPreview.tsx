import React from 'react';
import './ShopPreview.css'
import tshirt from '../images/T-shirt Mockup.png'
import Kangaroo from '../images/Kangaroo Pocket Pullover Hoodie Mockup.png'
import cardRed from '../images/Rectangle40.png'
import { Box, Card, CardContent, Typography } from '@mui/material';

interface Item {
    id: number;
    title: string;
    content?:string;
    image: string; // Новое поле для изображения
  }
  
  const items: Item[] = [
    { id: 1, title: 'Лидинёв Олег Васильевич',content:"Что делать соперникам, когда у вас в атаке ...",  image:  tshirt },
    { id: 2, title: 'Погребняк ПавелВикторович',content:"Что делать соперникам, когда у вас в атаке ...",  image:  Kangaroo},
    { id: 3, title: 'Марьяшин ПавелАндреевич',content:"Что делать соперникам, когда у вас в атаке ...",  image: tshirt },
    
 
  ];



const ShopPreview = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
  
    const handleCardClick = (index: number) => {
      setCurrentIndex(index);
    };
    return (
        <div className='shop-container'>
            <div className='shop-content'>
                <div className='title-links'>
                <h1>Магазин</h1>
                <a href="#">Узнать больше...</a>
                </div>
                <div>
                <Box className="shop-box">
        {items.map((item) => {
          
  
         
  
          return (
            <Card
              key={item.id}
              className="shop-item"
              
              
            >
              <img src={item.image} alt={item.title} className="shop-image" />
              <CardContent>
                <Typography variant="h5">{item.title}</Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
                </div>
            </div>
        </div>
    );
};

export default ShopPreview;