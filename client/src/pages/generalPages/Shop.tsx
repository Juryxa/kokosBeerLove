import React, { useEffect, useState } from 'react';
import './Shop.css';
import { Card, CardContent, Typography, Button } from '@mui/material';
import data from './shop.json';
import tshirt from '../../images/T-shirt Mockup.png';
import kangaroo from '../../images/Kangaroo Pocket Pullover Hoodie Mockup.png';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {ShopResponse} from "../../api/models/response/ShopResponse";
import ShopService from "../../api/services/ShopService";

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
  const [shopData, setShopData] = useState<ShopResponse[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shopItem, setShopItem] = useState<ShopResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchShop();
  }, []);

  const fetchShop = async () => {
    setIsLoading(true);
    try {
      const response = await ShopService.getAllProducts();
      setShopData(response.data);
    } catch (error) {
      setErrorMessage('Ошибка загрузки новостей.');
    } finally {
      setIsLoading(false);
    }
  };


  // Определяем элементы, которые будут отображаться на текущей странице
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = shopData.slice(indexOfFirstItem, indexOfLastItem);

  // Обработка переключения страниц
  const totalPages = Math.ceil(shopData.length / itemsPerPage);

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
          {isLoading && (
              <div className='loading-spinner'></div>
          )}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {currentItems.map((item) => (
            <Card key={item.id} className="page-shop-card">
              <img src={imageMapping[item.url_images[0]]} alt={item.name} className="page-shop-card-image" />
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2">{item.description}</Typography>
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
