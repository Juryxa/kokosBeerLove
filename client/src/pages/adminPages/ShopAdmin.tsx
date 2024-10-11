import React, { useState, useEffect } from 'react';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import ShopService from '../../api/services/ShopService';
import { uploadImage } from './functions/uploadImage';
import { ShopResponse } from '../../api/models/response/ShopResponse';
import './ShopAdmin.css';

const ShopAdmin = () => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<string>('');  // Поле для цены как строка
    const [image, setImage] = useState<File | null>(null);
    const [productList, setProductList] = useState<ShopResponse[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editProductId, setEditProductId] = useState<number | null>(null);
    const [originalProduct, setOriginalProduct] = useState<ShopResponse | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await ShopService.getAllProducts();
            setProductList(response.data);
        } catch (error) {
            setErrorMessage('Ошибка загрузки товаров.');
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, selectionStart } = e.target;

        // Проверка на то, что введенное значение является числом с не более чем двумя знаками после запятой
        const regex = /^\d+(\.\d{0,2})?$/;

        if (value === '' || regex.test(value)) {
            setPrice(value);

            // Перемещаем курсор на правильную позицию
            setTimeout(() => {
                e.target.setSelectionRange(selectionStart, selectionStart);
            }, 0);
        }
    };

    const handleAddOrUpdateProduct = async () => {
        if (!productName || !description || price === '') {
            setErrorMessage('Заполните все поля!');
            return;
        }

        try {
            let imageUrl: string[] = [];

            if (image) {
                const uploadedImageUrl = await uploadImage(image, setSuccessMessage, setErrorMessage, 'shop_images');
                imageUrl = [uploadedImageUrl];
            }

            const parsedPrice = parseFloat(price);  // Преобразуем строку в число перед отправкой на сервер
            if (isNaN(parsedPrice)) {
                setErrorMessage('Цена должна быть числом.');
                return;
            }

            if (isEditing && editProductId !== null) {
                if (originalProduct) {
                    const isNameChanged = originalProduct.name !== productName;
                    const isDescriptionChanged = originalProduct.description !== description;
                    const isPriceChanged = originalProduct.price !== parsedPrice;
                    const isImageChanged = image !== null;

                    if (isNameChanged || isDescriptionChanged || isPriceChanged || isImageChanged) {
                        await ShopService.updatePartProduct(
                            editProductId,
                            productName,
                            description,
                            parsedPrice,
                            imageUrl.length > 0 ? imageUrl : originalProduct.url_images
                        );
                        setSuccessMessage('Товар обновлен.');
                    } else {
                        setSuccessMessage('Изменений не обнаружено.');
                    }
                }
            } else {
                await ShopService.createProduct(productName, description, parsedPrice, imageUrl);
                setSuccessMessage('Товар добавлен.');
            }

            // Очистка формы
            setProductName('');
            setDescription('');
            setPrice('');
            setImage(null);
            setIsEditing(false);
            setEditProductId(null);
            setOriginalProduct(null);

            await fetchProducts();
        } catch (error) {
            setErrorMessage('Ошибка при сохранении товара.');
        }
    };

    const handleEditProduct = async (productId: number) => {
        try {
            const response = await ShopService.getProductId(productId);
            const product = response.data;

            setProductName(product.name);
            setDescription(product.description);
            setPrice(product.price);  // Оставляем цену как строку
            setIsEditing(true);
            setEditProductId(product.id);
            setOriginalProduct(product);
        } catch (error) {
            setErrorMessage('Ошибка при загрузке товара для редактирования.');
        }
    };

    const handleDeleteProduct = async (id: number) => {
        try {
            await ShopService.deleteProduct(id);
            setSuccessMessage('Товар удалён.');
            await fetchProducts();
        } catch (error) {
            setErrorMessage('Ошибка при удалении товара.');
        }
    };

    return (
        <div className="shop-admin-container">
            <h2 className="shop-admin-title">{isEditing ? 'Редактировать товар' : 'Добавить товар'}</h2>

            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            <input
                type="text"
                className="shop-admin-input"
                placeholder="Название товара"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
            />
            <textarea
                className="shop-admin-textarea"
                placeholder="Описание товара"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="text"
                className="shop-admin-input"
                placeholder="Цена"
                value={price}  // Оставляем строковое значение цены
                onChange={handlePriceChange}
            />
            <label className="shop-admin-file-label">
                Загрузить изображение
                <input type="file" accept="image/png, image/jpeg" className="shop-admin-file-input" onChange={handleFileChange} />
            </label>
            {image && <p className="shop-admin-image-name">Файл: {image.name}</p>}

            <button className="shop-admin-button" onClick={handleAddOrUpdateProduct}>
                {isEditing ? 'Сохранить изменения' : 'Добавить товар'}
            </button>

            <div className="product-admin-list">
                <h3 className="product-admin-list-title">Список товаров</h3>
                <ul className="product-admin-list-items">
                    {Array.isArray(productList) && productList.length > 0 ? (
                        productList.map((product) => (
                            <li key={product.id} className="product-admin-list-item">
                                <div className="product-admin-list-item-content">
                                    <h4>{product.name}</h4>
                                    <p>{product.description}</p>
                                    <p>{product.price} ₽</p>  {/* Оставляем цену как строку */}
                                    {product.url_images && product.url_images.length > 0 && (
                                        <img src={product.url_images[0]} alt={product.name} className="product-image" />
                                    )}
                                </div>
                                <div className="product-admin-list-item-actions">
                                    <button onClick={() => handleEditProduct(product.id)} className="edit-button">
                                        <EditIcon />
                                    </button>
                                    <button onClick={() => handleDeleteProduct(product.id)} className="delete-button">
                                        <DeleteIcon />
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>Товаров нет</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ShopAdmin;
