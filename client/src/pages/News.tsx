import React from 'react';
import './News.css';
import newsImg from '../images/news.png'; // Укажите правильный путь к вашему изображению
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface News {
    title: string;
    content: string;
    image: string;
}

const NewsCard: React.FC<News> = ({ title, content, image }) => {
    return (
        <div className="news-card">
            <div className="news-content-text">
                <h3 className="news-title">{title}</h3>
                <p className="news-text">{content}</p>
            </div>
            <div className="news-content-img">
                <img src={image} alt="news" className="news-image" />
            </div>
        </div>
    );
};

const News = () => {
    const newsData = [
        {
            title: "Павел Погребняк дебютировал в Лиге F",
            content: "И сразу забил гол, послематчевый пенальти и принёс команде первые очки!",
            image: newsImg,
        },
        {
            title: "Кокс Групп - дебютант Суперлиги с очень грозным составом!",
            content: "Что делать соперникам, когда у вас в атаке ...",
            image: newsImg,
        },
        {
            title: "Павел Погребняк дебютировал в Лиге F",
            content: "И сразу забил гол, послематчевый пенальти и принёс команде первые очки!",
            image: newsImg,
        },
        {
            title: "Кокс Групп - дебютант Суперлиги с очень грозным составом!",
            content: "Что делать соперникам, когда у вас в атаке ...",
            image: newsImg,
        },
        {
            title: "Павел Погребняк дебютировал в Лиге F",
            content: "И сразу забил гол, послематчевый пенальти и принёс команде первые очки!",
            image: newsImg,
        },
        {
            title: "Кокс Групп - дебютант Суперлиги с очень грозным составом!",
            content: "Что делать соперникам, когда у вас в атаке ...",
            image: newsImg,
        },
        {
            title: "Павел Погребняк дебютировал в Лиге F",
            content: "И сразу забил гол, послематчевый пенальти и принёс команде первые очки!",
            image: newsImg,
        },
        {
            title: "Кокс Групп - дебютант Суперлиги с очень грозным составом!",
            content: "Что делать соперникам, когда у вас в атаке ...",
            image: newsImg,
        },
        {
            title: "Павел Погребняк дебютировал в Лиге F",
            content: "И сразу забил гол, послематчевый пенальти и принёс команде первые очки!",
            image: newsImg,
        },
        
        {
            title: "Павел Погребняк дебютировал в Лиге F",
            content: "И сразу забил гол, послематчевый пенальти и принёс команде первые очки!",
            image: newsImg,
        },
        {
            title: "Кокс Групп - дебютант Суперлиги с очень грозным составом!",
            content: "Что делать соперникам, когда у вас в атаке ...",
            image: newsImg,
        },
        {
            title: "Высший дивизион - 25 тур",
            content: "Новый турнир! Шок контент...",
            image: newsImg,
        },
        {
            title: "Высший дивизион - 25 тур",
            content: "Новый турнир! Шок контент...",
            image: newsImg,
        }, {
            title: "Павел Погребняк дебютировал в Лиге F",
            content: "И сразу забил гол, послематчевый пенальти и принёс команде первые очки!",
            image: newsImg,
        },
        {
            title: "Кокс Групп - дебютант Суперлиги с очень грозным составом!",
            content: "Что делать соперникам, когда у вас в атаке ...",
            image: newsImg,
        }, {
            title: "Павел Погребняк дебютировал в Лиге F",
            content: "И сразу забил гол, послематчевый пенальти и принёс команде первые очки!",
            image: newsImg,
        },
        {
            title: "Кокс Групп - дебютант Суперлиги с очень грозным составом!",
            content: "Что делать соперникам, когда у вас в атаке ...",
            image: newsImg,
        }, {
            title: "Павел Погребняк дебютировал в Лиге F",
            content: "И сразу забил гол, послематчевый пенальти и принёс команде первые очки!",
            image: newsImg,
        },
        {
            title: "Кокс Групп - дебютант Суперлиги с очень грозным составом!",
            content: "Что делать соперникам, когда у вас в атаке ...",
            image: newsImg,
        }, {
            title: "Павел Погребняк дебютировал в Лиге F",
            content: "И сразу забил гол, послематчевый пенальти и принёс команде первые очки!",
            image: newsImg,
        },
        {
            title: "Кокс Групп - дебютант Суперлиги с очень грозным составом!",
            content: "Что делать соперникам, когда у вас в атаке ...",
            image: newsImg,
        },
        // Добавьте больше новостей здесь
    ];

    return (
        <div className='container-news'>
            <Header/>
        <div className="news-section">
            
            <h1>НОВОСТИ</h1>
            <div className="news-cards-container">
                {newsData.map((news, index) => (
                    <NewsCard key={index} title={news.title} content={news.content} image={news.image} />
                ))}
            </div>
            
        </div>
        <Footer/>
        </div>
    );
};

export default News;
