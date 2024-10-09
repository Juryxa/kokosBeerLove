/* eslint-disable jsx-a11y/iframe-has-title */
import React, { FC, useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Matches.css';
import mathes from './Mathes.json';
import translation from './Translation.json';
import CreateVideoFrame from '../../components/CreateVideoFrame'; // Импортируем компонент
import { useNavigate } from 'react-router-dom';

interface MatchesType {
  id?: number;
  oid: string;
  idVideo: string;
  hd: number;
  width: number;
  height: number;
  autoplay?: boolean;
  data?: string;
  scoreteam1?: number;
  scoreteam2?: number;
  location?: string;
  league?: string;
}

const Matches: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [videosToShow, setVideosToShow] = useState(4);
  const [isMobile, setIsMobile] = useState(false);
  const [mathesData, setMatchesData] = useState<MatchesType[]>([]);
  const [translationData, setTranslationData] = useState<MatchesType[]>([]);

  useEffect(() => {
    setMatchesData(mathes.mathesvideo);
    setTranslationData(translation.translation);
  }, []);

  useEffect(() => {
    const iframes = document.querySelectorAll('iframe');
    let loadedIframes = 0;

    const handleIframeLoad = () => {
      loadedIframes++;
      if (loadedIframes === iframes.length) {
        setIsLoading(false);
      }
    };

    iframes.forEach((iframe) => {
      iframe.addEventListener('load', handleIframeLoad);
    });

    return () => {
      iframes.forEach((iframe) => {
        iframe.removeEventListener('load', handleIframeLoad);
      });
    };
  }, [translationData, mathesData]);

  useEffect(() => {
    // Определение, является ли экран мобильным
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setVideosToShow(window.innerWidth < 768 ? 1 : 4); // Установка начального количества видео
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Установить состояние при первом рендере

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleShowMore = () => {
    setVideosToShow((prevCount) => prevCount + (isMobile ? 4 : 8)); // Добавляем видео в зависимости от устройства
  };

  const navigate = useNavigate();

  const handleCardClick = (id: number | undefined) => {
    if (id) {
      navigate(`/match/${id}`);
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h1 className={`hiddenToo ${isLoading ? 'hidden' : ''}`}>Матчи</h1>
        <div className="content">
          {isLoading && <div className="loading-spinner"></div>}
          {translationData.map((video) => (
            <div className={`TraslateVk ${isLoading ? 'hidden' : ''}`} key={video.id}>
              <CreateVideoFrame
                oid={video.oid}
                id={video.idVideo}
                hd={video.hd}
                width={video.width}
                height={video.height}
                autoplay={1}
              />
            </div>
          ))}
          <h2 className={`hiddenToo ${isLoading ? 'hidden' : ''}`}>Записи матчей</h2>
          <div className="lastephire">
            {mathesData.slice(0, videosToShow).map((video) => (
              <div className="ephir-1" key={video.id} onClick={() => handleCardClick(video.id)}>
                <div className={`videosVk ${isLoading ? 'hidden' : ''}`}>
                  <CreateVideoFrame
                    oid={video.oid}
                    id={video.idVideo}
                    hd={video.hd}
                    width={video.width}
                    height={video.height}
                  />
                  <div className="video-info">
                    <table>
                      <tbody>
                        <tr>
                          <th>Запись матча</th>
                          <td>{video.data}</td>
                        </tr>
                        <tr>
                          <th>Счет</th>
                          <td>{video.scoreteam1} - {video.scoreteam2}</td>
                        </tr>
                        <tr>
                          <th>Место</th>
                          <td>{video.location}</td>
                        </tr>
                        <tr>
                          <th>Лига</th>
                          <td>{video.league}</td>
                        </tr>
                      </tbody>
                    </table>
                    <button className="button" onClick={() => handleCardClick(video.id)}>
                      Подробнее
                      <span className="arrow">→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {isLoading && <div className="loading-spinner"></div>}
          {videosToShow < mathesData.length && !isLoading && (
            <button onClick={handleShowMore} className={`show-more-button ${isLoading ? 'hidden' : ''}`}>
              Показать больше
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Matches;
