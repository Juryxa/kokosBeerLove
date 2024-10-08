import React from 'react';
import { useParams } from 'react-router-dom';
import data from './news.json';

interface NewsType {
    id: number;
    title: string;
    content: string;
    image: string;
}

const NewsDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // Проверяем, что id был успешно получен и преобразовываем его в число
    const newsId = parseInt(id || '', 10);
    const newsItem = data.news.find((news: NewsType) => news.id === newsId);

    // Если новость не найдена, выводим сообщение об ошибке
    if (!newsItem) {
        return <div>Новость не найдена</div>;
    }

    return (
        <div className="news-details">
            <h2>{newsItem.title}</h2>
            <img src={newsItem.image} alt={newsItem.title} />
            <p>{newsItem.content}</p>
        </div>
    );
};

export default NewsDetails;
