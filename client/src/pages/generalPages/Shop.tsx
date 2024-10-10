import React, { useEffect, useState } from 'react';
import './Shop.css';
import tshirt from '../../images/T-shirt Mockup.png';
import kangaroo from '../../images/Kangaroo Pocket Pullover Hoodie Mockup.png';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { ShopResponse } from '../../api/models/response/ShopResponse';
import ShopService from '../../api/services/ShopService';
import { Link } from 'react-router-dom';
import { Button } from "@mui/material";

const imageMapping: Record<string, string> = {
  tshirt: tshirt,
  kangaroo: kangaroo,
};

const ShopCard: React.FC<ShopResponse> = ({ id, name, description, price, url_images }) => {
  return (
      <Link to={`/shop/${id}`} className="shop-card">
        <div className="shop-content-text">
          <h3 className="shop-title">{name}</h3>
          <p className="shop-description">{description}</p>
        </div>
        <div className="shop-content-img">
          <img src={url_images[0]} alt={name} className="shop-image" />
        </div>
        <div>
          <p className="shop-price">{price} ₽</p>
        </div>
        <div className="shop-content-action">
          <Button variant="contained" color="error" className="shop-order-button">Заказать</Button>
        </div>
      </Link>
  );
};

const Shop = () => {
  const [shopData, setShopData] = useState<ShopResponse[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [searchQuery, setSearchQuery] = useState(''); // Состояние для текста поиска

  useEffect(() => {
    fetchShop();
  }, []);

  const fetchShop = async () => {
    setIsLoading(true);
    try {
      const response = await ShopService.getAllProducts();
      setShopData(response.data);
    } catch (error) {
      setErrorMessage('Ошибка загрузки товаров.');
    } finally {
      setIsLoading(false);
    }
  };

  // Фильтрация товаров по имени
  const filteredShopData = shopData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredShopData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredShopData.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  return (
      <div className="container-shop">
        <Header />
        <div className="shop-section">
          <h1>Магазин</h1>
          {/* Поле поиска */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Поиск товара"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '10px',
                border: '1px solid red', // Красная рамка
                borderRadius: '5px',
                width: '300px',
                marginBottom: '20px',
              }}
            />
          </div>
          <div className="shop-cards-container">
            {isLoading && <div className="loading-spinner"></div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {currentItems.map((item) => (
                <ShopCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    url_images={item.url_images}
                />
            ))}
          </div>
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Предыдущая
            </button>
            <span style={{ color: 'white' }}>
              Страница {currentPage} из {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Следующая
            </button>
          </div>
        </div>
        <Footer />
      </div>
  );
};

export default Shop;
