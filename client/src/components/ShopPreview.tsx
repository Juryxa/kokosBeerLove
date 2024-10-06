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
    
  }
  
  const items: Item[] = [
    { id: 1, title: 'Футболка',content:"Что делать соперникам, когда у вас в атаке ...",  image:  tshirt},
    { id: 2, title: 'Толстовка',content:"Что делать соперникам, когда у вас в атаке ...",  image:  Kangaroo},
    { id: 3, title: 'Футболка Mark-2',content:"Что делать соперникам, когда у вас в атаке ...",  image: tshirt},
    { id: 4, title: 'Футболка Mark-2',content:"Что делать соперникам, когда у вас в атаке ...",  image: tshirt},
    { id: 5, title: 'Толстовка',content:"Что делать соперникам, когда у вас в атаке ...",  image:  Kangaroo},
  ];



 

  const ShopPreview = () => {
    return (
    <div className="shop-container">
      <div className="shop-content">
        <div className="title-links" style={{ color: 'black' }}>
          <h1>Магазин</h1>
          <a href="#">Переходите в официальный магазин команды</a>
        </div>
        <div className="card-container">
          {items.map((item) => (
            <Card key={item.id} className="shop-card">
              <img src={item.image} alt={item.title} className="shop-card-image" />
              <CardContent >
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2">{item.content}</Typography>
                <Button variant="contained" color="error" className="shop-card-button">Заказать</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPreview;