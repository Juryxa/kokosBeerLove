import React, {useEffect, useState} from 'react';
import './News.css';
import imgnews from '../../images/news.png';
import {Link} from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {NewsResponse} from "../../api/models/response/NewsResponse";
import NewsService from "../../api/services/NewsService";
import {parseAndFormatDate} from "./functions/dateParser";



const imageMapping: Record<string, string> = {
    imgnews: imgnews,
};


const truncateText = (text:string, wordLimit:number):string => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
};

const NewsCard: React.FC<NewsResponse> = ({id, title, text, image, created_at}) => {
    return (
        <Link to={`/news/${id}`} className="news-card">
            <div className="news-content-text">
            
                <h3 className="news-title">{truncateText(title, 10)}</h3>
                <p className="news-text" >{truncateText(text, 20)}</p>  
                <p className="news-time">{parseAndFormatDate(created_at)}</p>
            </div>
            <div className="news-content-img">
                <img src={image} alt="news" className="news-image"/>
            </div>

        </Link>
    );
};

const News = () => {
    const [newsData, setNewsData] = useState<NewsResponse[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        setIsLoading(true);
        try {
            const response = await NewsService.getAllNews();
            setNewsData(response.data);
        } catch (error) {
            setErrorMessage('Ошибка загрузки новостей.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='container-news'>
            <Header/>
            <div className="news-section">
                <h1>НОВОСТИ</h1>
                <div className="news-cards-container">
                    {isLoading && (
                        <div className='loading-spinner'></div>
                    )}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    {newsData.map((news) => (
                        <NewsCard
                            key={news.id}
                            id={news.id}
                            title={news.title}
                            text={news.text}
                            image={imageMapping[news.image] || imgnews}
                            
                            created_at={news.created_at}/>
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default News;
