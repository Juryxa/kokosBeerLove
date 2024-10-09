import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CreateVideoFrame from '../components/CreateVideoFrame';
import './MatchDetails.css'
import matches from './Mathes.json';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MatchDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const match = matches.mathesvideo.find((m) => m.id === parseInt(id || '', 10));
  const [isLoading, setIsLoading] = useState(true);

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
  }, []);

  if (!match) {
    return <div>Матч не найден</div>;
  }

  return (
    <div style={{ height: '100vh' }}>
      <Header />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <h1 style={{ display: isLoading ? 'none' : 'block' }}>Детали матча</h1>
          {isLoading && (
            <div className="loading-spinner-container">
              <div className="loading-spinner"></div>
            </div>
          )}
          <div style={{ width: '60vw', display: isLoading ? 'none' : 'block' }}>
            <CreateVideoFrame
              oid={match.oid}
              id={match.idVideo}
              hd={match.hd}
              width={match.width}
              height={match.height}
            />
          </div>

          <div style={{ display: isLoading ? 'none' : 'block' }}>
            <p>Дата: {match.data}</p>
            <p>Счет: {match.scoreteam1} - {match.scoreteam2}</p>
            <p>Место: {match.location}</p>
            <p>Лига: {match.league}</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MatchDetails;
