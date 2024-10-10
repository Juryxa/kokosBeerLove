import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {ShopResponse} from "../../api/models/response/ShopResponse";
import ShopService from "../../api/services/ShopService";

const ShopDetails = () => {
    const {id} = useParams<{ id: string }>();
    const productId = parseInt(id || '', 10);
    const [productItem, setProductItem] = useState<ShopResponse | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

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
                setErrorMessage('Новость не найдена.');
            } else {
                setErrorMessage('Ошибка загрузки новостей.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="news-details">
            {isLoading && (
                <div className='loading-spinner'></div>
            )}
            {errorMessage ? (
                <div className="error-message">{errorMessage}</div>
            ) : (
                productItem && (
                    <>
                        <h2>{productItem.name}</h2>
                        <img src={productItem.url_images[0]} alt={productItem.name}/>
                        <p>{productItem.description}</p>
                    </>
                )
            )}
        </div>
    );
};

export default ShopDetails;