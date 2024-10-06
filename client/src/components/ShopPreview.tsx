import React from 'react';
import './ShopPreview.css'
import tshirt from '../images/T-shirt Mockup.png'
import Kangaroo from '../images/Kangaroo Pocket Pullover Hoodie Mockup.png'
import redCap from '../images/beysbolka-unit-promo-krasnaya-foto2.jpeg'
import cardRed from '../images/Rectangle40.png'
import { Masonry } from '@mui/lab';
import { Card, CardContent, Typography, Button } from '@mui/material';

interface Item {
    id: number;
    title: string;
    content?:string;
    image: string; 
    size: 'small'|'medium' | 'large';
  }
  
  const items: Item[] = [
    { id: 1, title: 'Футболка',content:"Что делать соперникам, когда у вас в атаке ...",  image:  tshirt,size:'medium' },
    { id: 2, title: 'Кепка',content:"Что делать соперникам, когда у вас в атаке ...",  image:  redCap,size:'small' },
    { id: 3, title: 'Толстовка',content:"Что делать соперникам, когда у вас в атаке ...",  image:  Kangaroo,size:'large'},
    { id: 4, title: 'Футболка Mark-2',content:"Что делать соперникам, когда у вас в атаке ...",  image: tshirt ,size:'medium'},
    { id: 5, title: 'Футболка',content:"Что делать соперникам, когда у вас в атаке ...",  image:  tshirt ,size:'medium'},
   
    { id: 6, title: 'Кепка',content:"Что делать соперникам, когда у вас в атаке ...",  image:  redCap,size:'small' },
    { id: 7, title: 'Футболка Mark-2',content:"Что делать соперникам, когда у вас в атаке ...",  image: tshirt ,size:'medium'},
    { id: 8, title: 'Футболка',content:"Что делать соперникам, когда у вас в атаке ...",  image:  tshirt,size:'medium' },
    { id: 9, title: 'Толстовка',content:"Что делать соперникам, когда у вас в атаке ...",  image:  Kangaroo,size:'large'},
    { id: 10, title: 'Кепка',content:"Что делать соперникам, когда у вас в атаке ...",  image:  redCap,size:'small' },
    
  ];



  const getSizeStyle = (size: string) => {
    switch (size) {
      case 'small':
        return { height: 500 }; // маленький размер для кепок
      case 'medium':
        return { height: 650 }; // средний размер для футболок
      case 'large':
        return { height: 650 }; // большой размер для толстовок
      
    }
  };

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
                <Masonry columns={4} spacing={2}>
    {items.map((item) => (
      <Card key={item.id} style={{ ...getSizeStyle(item.size) }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', objectFit: 'cover' }} />
        <CardContent>
          <Typography variant="h6">{item.title}</Typography>
          <Typography variant="body2">{item.content}</Typography>
          <Button variant="contained" color="error">Заказать</Button>
        </CardContent>
      </Card>
    ))}
  </Masonry>
                </div>
            </div>
        </div>
    );
};

export default ShopPreview;