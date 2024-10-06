import React, { useState, useEffect } from 'react';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import './NewsAdmin.css';

const NewsAdmin = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [newsList, setNewsList] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editNewsId, setEditNewsId] = useState<number | null>(null);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        // Пример данных для тестирования UI
        setNewsList([
            { id: 1, title: 'Новость 1', content: 'Текст новости 1', imageUrl: '/images/news1.jpg' },
            { id: 2, title: 'Новость 2', content: 'Текст новости 2', imageUrl: '/images/news2.jpg' }
        ]);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    const handleAddOrUpdateNews = async () => {
        if (!title || !content) {
            alert('Заполните все поля!');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }

        // Очистка формы
        setTitle('');
        setContent('');
        setImage(null);
        setIsEditing(false);
        setEditNewsId(null);

        fetchNews();
    };

    const handleEditNews = (news: any) => {
        setTitle(news.title);
        setContent(news.content);
        setIsEditing(true);
        setEditNewsId(news.id);
    };

    const handleDeleteNews = async (id: number) => {
        fetchNews();
    };

    return (
        <div className="news-admin-container">
            <h2 className="news-admin-title">{isEditing ? 'Редактировать новость' : 'Добавить новость'}</h2>

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
                                <p>{news.content}</p>
                            </div>
                            <div className="news-list-item-actions">
                                <button onClick={() => handleEditNews(news)} className="edit-button">
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
