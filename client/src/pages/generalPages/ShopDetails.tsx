import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { ShopResponse } from "../../api/models/response/ShopResponse";
import ShopService from "../../api/services/ShopService";
import img1 from '../../images/T-shirt Mockup.png';
import img2 from '../../images/Kangaroo Pocket Pullover Hoodie Mockup.png';

import './ShopDetails.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface Product {
    name: string;
    price: number;
    oldPrice: number;
    image: string;
    rating: number;
    reviewsCount: number;
    colorOptions: string[];
    sizeOptions: string[];
    description: string;
    article: string;
    material: string;
    country: string;
    features: string;
    availability: string;
    storeRating: number;
    deliveryDate: string;
}

const ShopDetails = () => {
    const { id } = useParams<{ id: string }>();
    const productId = parseInt(id || '', 10);
    const [productItem, setProductItem] = useState<ShopResponse | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    const productImages = [img1, img2]; // Массив изображений

    const product: Product = {
        name: 'Футболка оверсайз с принтом черная',
        price: 997,
        oldPrice: 3500,
        image: '/path/to/image.jpg',
        rating: 4.8,
        reviewsCount: 1018,
        colorOptions: ['Черный', 'Белый'],
        sizeOptions: ['S', 'M', 'L', 'XL', 'XXL'],
        description: 'Износостойкость, тренд',
        article: '154087085',
        material: '95% хлопок, 5% эластан',
        country: 'Китай',
        features: 'Без карманов, круглый вырез',
        availability: '12 октября, склад WB',
        storeRating: 4.7,
        deliveryDate: '14 дней на возврат',
    };

    useEffect(() => {
        fetchShop();
    }, []);

    const fetchShop = async () => {
        setIsLoading(true);
        try {
            const response = await ShopService.getProductId(productId);
            setProductItem(response.data);
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                setErrorMessage('Товары не найдены.');
            } else {
                setErrorMessage('Ошибка загрузки товаров.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
    };

    const handleSizeSelect = (size: string) => {
        setSelectedSize(size);
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
        );
    };

    return (
        <>
        <Header />
        <div className='container-shop-details'>
            
            <div className='content-shop-details'>
                <div className="product-image">
                    <img src={productItem?.url_images[currentImageIndex]} alt={product.name} />
                    <div className="image-navigation-buttons">
                        <button onClick={handlePrevImage} className="prev-image-button">Назад</button>
                        <button onClick={handleNextImage} className="next-image-button">Вперед</button>
                    </div>
                </div>
                <div className="product-card">
                    <div className="product-info">
                        <h1 className="product-name">{productItem?.name}</h1>
                        <div className="product-rating">
                            <span>⭐️ {product.rating}</span>
                            <span>({product.reviewsCount} отзывов)</span>
                        </div>
                        <div className="product-price">
                            <span className="new-price">{product.price} ₽</span>
                            <span className="old-price">{product.oldPrice}</span>
                        </div>
                        <div className="product-colors">
                            <p>Цвет:</p>
                            <div>
                                {product.colorOptions.map((color, index) => (
                                    <button
                                        key={index}
                                        className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                                        onClick={() => handleColorSelect(color)}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="product-sizes">
                            <p>Размеры:</p>
                            <div>
                                {product.sizeOptions.map((size, index) => (
                                    <button
                                        key={index}
                                        className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                        onClick={() => handleSizeSelect(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <p>Описание: {productItem?.description}</p>
                        <div className="product-buttons">
                            <button className="add-to-cart">Добавить в корзину</button>
                            <button className="buy-now">Купить сейчас</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <Footer />
        </>
    );
};

export default ShopDetails;
