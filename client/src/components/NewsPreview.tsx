import React from 'react';
import './NewsPreview.css'; 
import newsImg from '../images/news.png'
import {Link} from 'react-router-dom';

interface News{
    title:string, 
    content:string, 
    image:string,
}




const NewsCard:React.FC<News> = ({ title, content, image }) => {
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

const NewsPreview = () => {
  const newsData = [
    {
      title: "Павел Погребняк дебютировал в Лиге F",
      content: "И сразу забил гол, послематчевый пенальти и принёс команде первые очки!",
      image: "../images/news.png" // Укажите путь к вашему изображению
    },
    {
      title: "Кокс Групп - дебютант Суперлиги с очень грозным составом!",
      content: "Что делать соперникам, когда у вас в атаке ...",
      image: "../images/news.png" // Укажите путь к вашему изображению
    },
    {
      title: "Высший дивизион - 25 тур",
      content: "Новый турнир! Шок контент...",
      image: "../images/news.png" // Укажите путь к вашему изображению
    },
    {
      title: "Высший дивизион - 25 тур",
      content: "Новый турнир! Шок контент...",
      image: "../images/news.png" // Укажите путь к вашему изображению
    },
  ];

  return (
    <div className="news-section">
      <h1>НОВОСТИ</h1>
      <button className="more-button">
  <Link to="/news" style={{ textDecoration: 'none', color: 'white' }}>
    Узнать больше
  </Link>
</button>
      <div className="news-cards-container">
        {newsData.map((news, index) => (
          <NewsCard key={index} title={news.title} content={news.content} image={newsImg} />
        ))}
      </div>
    </div>
  );
};

export default NewsPreview;

