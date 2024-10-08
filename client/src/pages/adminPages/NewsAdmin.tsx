import React, { useState, useEffect } from 'react';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import ContentService from '../../api/services/ContentService'
import { NewsResponse } from '../../api/models/response/NewsResponse';
import {uploadImage} from "./functions/uploadImage";
import './NewsAdmin.css';

const NewsAdmin = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [newsList, setNewsList] = useState<NewsResponse[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editNewsId, setEditNewsId] = useState<number | null>(null);
    const [originalNews, setOriginalNews] = useState<NewsResponse | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await ContentService.getAllNews();
            setNewsList(response.data.news);
        } catch (error) {
            setErrorMessage('Ошибка загрузки новостей.');
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    const handleAddOrUpdateNews = async () => {
        if (!title || !content) {
            setErrorMessage('Заполните все поля!');
            return;
        }

        try {
            let imageUrl: string | '';

            if (image) {
                imageUrl = await uploadImage(image, setSuccessMessage, setErrorMessage);
            }
            else{
                imageUrl = '';
            }

            if (isEditing && editNewsId !== null) {
                if (originalNews) {
                    const isTitleChanged = originalNews.title !== title;
                    const isContentChanged = originalNews.text !== content;
                    const isImageChanged = image !== null;

                    if (isTitleChanged && isContentChanged && isImageChanged) {
                        await ContentService.updateFullNews(editNewsId, title, content, imageUrl || originalNews.image);
                        setSuccessMessage('Новость полностью обновлена.');
                    } else {
                        await ContentService.updatePartNews(editNewsId, title, content, imageUrl || originalNews.image);
                        setSuccessMessage('Новость частично обновлена.');
                    }
                }
            } else {
                await ContentService.createNews(title, content, imageUrl);
                setSuccessMessage('Новость добавлена.');
            }

            // Очистка формы
            setTitle('');
            setContent('');
            setImage(null);
            setIsEditing(false);
            setEditNewsId(null);
            setOriginalNews(null);

            fetchNews();
        } catch (error) {
            setErrorMessage('Ошибка при сохранении новости.');
        }
    };

    const handleEditNews = async (newsId: number) => {
        try {
            const response = await ContentService.getNewsId(newsId);
            const news = response.data;

            setTitle(news.title);
            setContent(news.text);
            setIsEditing(true);
            setEditNewsId(news.id);
            setOriginalNews(news); // Сохраняем оригинальные данные для сравнения
        } catch (error) {
            setErrorMessage('Ошибка при загрузке новости для редактирования.');
        }
    };

    const handleDeleteNews = async (id: number) => {
        try {
            await ContentService.deleteNews(id);
            setSuccessMessage('Новость удалена.');
            fetchNews();
        } catch (error) {
            setErrorMessage('Ошибка при удалении новости.');
        }
    };

    return (
        <div className="news-admin-container">
            <h2 className="news-admin-title">{isEditing ? 'Редактировать новость' : 'Добавить новость'}</h2>

            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            <input
                type="text"
                className="news-admin-input"
                placeholder="Заголовок"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className="news-admin-textarea"
                placeholder="Содержание"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <label className="news-admin-file-label">
                Загрузить изображение
                <input type="file" className="news-admin-file-input" onChange={handleFileChange} />
            </label>
            {image && <p className="news-admin-image-name">Файл: {image.name}</p>}

            <button className="news-admin-button" onClick={handleAddOrUpdateNews}>
                {isEditing ? 'Сохранить изменения' : 'Добавить новость'}
            </button>

            <div className="news-list">
                <h3 className="news-list-title">Список новостей</h3>
                <ul className="news-list-items">
                    {newsList.map((news) => (
                        <li key={news.id} className="news-list-item">
                            <div className="news-list-item-content">
                                <h4>{news.title}</h4>
                                <p>{news.text}</p>
                                <img src={news.image} alt={news.title} className="news-image" />
                            </div>
                            <div className="news-list-item-actions">
                                <button onClick={() => handleEditNews(news.id)} className="edit-button">
                                    <EditIcon />
                                </button>
                                <button onClick={() => handleDeleteNews(news.id)} className="delete-button">
                                    <DeleteIcon />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default NewsAdmin;