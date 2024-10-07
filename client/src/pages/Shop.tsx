import React, { useEffect, useState } from 'react';
import './Shop.css';
import { Card, CardContent, Typography, Button } from '@mui/material';
import data from './shop.json';
import tshirt from '../images/T-shirt Mockup.png';
import kangaroo from '../images/Kangaroo Pocket Pullover Hoodie Mockup.png';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface ShopType {
  id: number;
  title: string;
  content?: string;
  image: string;
}

const imageMapping: Record<string, string> = {
  tshirt: tshirt,
  kangaroo: kangaroo,
};

const Shop = () => {
  const [shopItem, setShopItem] = useState<ShopType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    setShopItem(data.shop);
  }, []);

  // Определяем элементы, которые будут отображаться на текущей странице
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = shopItem.slice(indexOfFirstItem, indexOfLastItem);

  // Обработка переключения страниц
  const totalPages = Math.ceil(shopItem.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  return (
    <div className="page-shop-container">
      <Header />
      <div className="page-shop-content">
        <div className="page-shop-title" >
          <h1>Магазин</h1>
        </div>
        <div className="page-shop-card-container">
          {currentItems.map((item) => (
            <Card key={item.id} className="page-shop-card">
              <img src={imageMapping[item.image]} alt={item.title} className="page-shop-card-image" />
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2">{item.content}</Typography>
                <Button variant="contained" color="error" className="page-shop-card-button">
                  Заказать
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Пагинация */}
        <div className="pagination">
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>
            Предыдущая
          </Button>
          <span style={{color:'white'}}>
            Страница {currentPage} из {totalPages}
          </span>
          <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Следующая
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
