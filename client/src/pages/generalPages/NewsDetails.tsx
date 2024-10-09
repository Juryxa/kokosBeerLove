import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import NewsService from "../../api/services/NewsService";
import {NewsResponse} from "../../api/models/response/NewsResponse";
import {parseAndFormatDate} from "./functions/dateParser";

const NewsDetails: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const newsId = parseInt(id || '', 10);
    const [newsItem, setNewsItem] = useState<NewsResponse | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        setIsLoading(true);
        try {
            const response = await NewsService.getNewsId(newsId);
            setNewsItem(response.data);
        } catch (error) {
            setErrorMessage('Ошибка загрузки новостей.');
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
                newsItem ? (
                    <>
                        <h2>{newsItem.title}</h2>
                        <img src={newsItem.image} alt={newsItem.title}/>
                        <p>{newsItem.text}</p>
                        <p>{parseAndFormatDate(newsItem.created_at)}</p>
                    </>
                ) : (
                    <div>Новость не найдена.</div>
                )
            )}
        </div>
    );
};

export default NewsDetails;
