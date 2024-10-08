import React, {useEffect, useState} from 'react';
import './ShopPreview.css'
import {Card, CardContent, Typography, Button} from '@mui/material';
import {Link} from "react-router-dom";
import {ShopResponse} from "../api/models/response/ShopResponse";
import ShopService from "../api/services/ShopService";
import ShopCard from "./ShopCard";



const ShopPreview = () => {

    const [shopData, setShopData] = useState<ShopResponse[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

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

    return (
        <div className="shop-container">
            <div className="shop-content">
                <div className="title-links" style={{color: 'black', marginLeft: '15px'}}>
                    <h1>Магазин</h1>
                    <Link to={'/shop'}>Переходите в официальный магазин команды</Link>
                </div>
                <div className="card-container">
                    {isLoading && (
                        <div className='loading-spinner'></div>
                    )}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    {shopData.slice(0, 5).map((item) => (
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
            </div>
        </div>
    );
};

export default ShopPreview;