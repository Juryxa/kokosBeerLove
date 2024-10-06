import React, { useState, useEffect } from 'react';
import './AdminForms.css';

const ShopAdmin = () => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [productList, setProductList] = useState<any[]>([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setProductList([
            { id: 1, productName: 'Товар 1', description: 'Описание товара 1', price: '1000 ₽', imageUrl: '/images/product1.jpg' },
            { id: 2, productName: 'Товар 2', description: 'Описание товара 2', price: '2000 ₽', imageUrl: '/images/product2.jpg' }
        ]);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    const handleAddOrUpdateProduct = async () => {
        if (!productName || !description || !price) {
            alert('Заполните все поля!');
            return;
        }

        setProductName('');
        setDescription('');
        setPrice('');
        setImage(null);

        fetchProducts();
    };

    return (
        <div className="admin-form-container">
            <h2 className="admin-form-title">Добавить товар</h2>

            <input
                type="text"
                className="admin-form-input"
                placeholder="Название товара"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
            />
            <textarea
                className="admin-form-textarea"
                placeholder="Описание товара"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="text"
                className="admin-form-input"
                placeholder="Цена"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <label className="admin-form-file-label">
                Загрузить изображение
                <input type="file" className="admin-form-file-input" onChange={handleFileChange} />
            </label>
            {image && <p className="admin-form-image-name">Файл: {image.name}</p>}

            <button className="admin-form-button" onClick={handleAddOrUpdateProduct}>Добавить товар</button>

            <div className="product-list">
                <h3>Список товаров</h3>
                <ul>
                    {productList.map((product) => (
                        <li key={product.id}>{product.productName}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ShopAdmin;
