import React, { useEffect, useState } from 'react';
import './News.css';
import imgnews from '../images/news.png';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import data from './news.json'; // Убедитесь, что путь к файлу news.json правильный

interface NewsType {
    id: number;
    title: string;
    content: string;
    image: string;
}

const imageMapping: Record<string, string> = {
    imgnews: imgnews,
};

const NewsCard: React.FC<NewsType> = ({ id, title, content, image }) => {
    return (
        <Link to={`/news/${id}`} className="news-card">
            <div className="news-content-text">
                <h3 className="news-title">{title}</h3>
                <p className="news-text">{content}</p>
            </div>
            <div className="news-content-img">
                <img src={image} alt="news" className="news-image" />
            </div>
        </Link>
    );
};

const News = () => {
    const [newsData, setNewsData] = useState<NewsType[]>([]);

    useEffect(() => {
        setNewsData(data.news); // Загружаем данные новостей из JSON-файла
    }, []);

    return (
        <div className='container-news'>
            <Header />
            <div className="news-section">
                <h1>НОВОСТИ</h1>
                <div className="news-cards-container">
                    {newsData.map((news) => (
                        <NewsCard 
                            key={news.id} 
                            id={news.id} 
                            title={news.title} 
                            content={news.content} 
                            image={imageMapping[news.image] || news.image} 
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default News;
