/* eslint-disable jsx-a11y/iframe-has-title */
import React, { FC, useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Matches.css';
import CreateVideoFrame from '../components/CreateVideoFrame'; // Импортируем компонент
import logo1 from '../images/logoteam1.png'
import logo2 from '../images/logo2.png'
import place from '../images/icons/stadium__small.svg'
import league from '../images/icons/ball.svg'

const Matches: FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const vkTranslation = {
        oid: '-25924859',
        id: '456239412',
        hd: 3,
        width: 720,
        height: 480,
        autoplay: true,
    };
  

    const vkLinks = [
        { id: 1, oid: '-170578', idVideo: '456241163', hd: 4,"title":"24.08.99","scoreteam1":1,"scoreteam2":1,"location":"Вернадка Парк. Поле № 1","league":"Высший дивизион ЮЗЛ-2024" },
        { id: 2, oid: '-55072656', idVideo: '456239074', hd: 4,"title":"24.08.99","scoreteam1":1,"scoreteam2":1,"location":"Вернадка Парк. Поле № 1","league":"Высший дивизион ЮЗЛ-2024"  },
        { id: 3, oid: '-55072656', idVideo: '456239074', hd: 4,"title":"24.08.99","scoreteam1":1,"scoreteam2":1,"location":"Вернадка Парк. Поле № 1","league":"Высший дивизион ЮЗЛ-2024"  },
        { id: 4, oid: '-2000965537', idVideo: '125965537', hd: 4,"title":"24.08.99","scoreteam1":1,"scoreteam2":1,"location":"Вернадка Парк. Поле № 1","league":"Высший дивизион ЮЗЛ-2024"  },
        { id: 5, oid: '-170578', idVideo: '456241163', hd: 4,"title":"24.08.99","scoreteam1":1,"scoreteam2":1,"location":"Вернадка Парк. Поле № 1","league":"Высший дивизион ЮЗЛ-2024"  },
        { id: 6, oid: '-55072656', idVideo: '456239074', hd: 4,"title":"24.08.99","scoreteam1":1,"scoreteam2":1,"location":"Вернадка Парк. Поле № 1","league":"Высший дивизион ЮЗЛ-2024"  },
        { id: 7, oid: '-55072656', idVideo: '456239074', hd: 4,"title":"24.08.99","scoreteam1":1,"scoreteam2":1,"location":"Вернадка Парк. Поле № 1","league":"Высший дивизион ЮЗЛ-2024"  },
        { id: 8, oid: '-2000965537', idVideo: '125965537', hd: 4,"title":"24.08.99","scoreteam1":1,"scoreteam2":1,"location":"Вернадка Парк. Поле № 1","league":"Высший дивизион ЮЗЛ-2024"  },
        { id: 9, oid: '-170578', idVideo: '456241163', hd: 4,"title":"24.08.99","scoreteam1":1,"scoreteam2":1,"location":"Вернадка Парк. Поле № 1","league":"Высший дивизион ЮЗЛ-2024"  },
        { id: 10, oid: '-55072656', idVideo: '456239074', hd: 4,"title":"24.08.99","scoreteam1":1,"scoreteam2":1,"location":"Вернадка Парк. Поле № 1","league":"Высший дивизион ЮЗЛ-2024"  },
        { id: 11, oid: '-55072656', idVideo: '456239074', hd: 4,"title":"24.08.99","scoreteam1":1,"scoreteam2":1,"location":"Вернадка Парк. Поле № 1","league":"Высший дивизион ЮЗЛ-2024"  },
        { id: 12, oid: '-2000965537', idVideo: '125965537', hd: 4,"title":"24.08.99","scoreteam1":1,"scoreteam2":1,"location":"Вернадка Парк. Поле № 1","league":"Высший дивизион ЮЗЛ-2024"  },
        
    ];


    const imageMapping: Record<string, string> = {
        logo1: logo1,
        logo2:logo2,
        place:place,
        league:league,
    };


    useEffect(() => {
        const iframe = document.querySelector('iframe');
        iframe?.addEventListener('load', () => setIsLoading(false));
    }, []);

    return (
        <div>
            <Header />
            <div className='container'>
            <h1 className={`hiddenToo ${isLoading ? 'hidden' : ''}`}>Матчи</h1>
                <div className='content'>
                    {isLoading && (
                        <div className='loading-spinner'></div>
                    )}
                    <div className={`TraslateVk ${isLoading ? 'hidden' : ''}`}>
                        <CreateVideoFrame
                            oid={vkTranslation.oid}
                            id={vkTranslation.id}
                            hd={vkTranslation.hd}
                            width={vkTranslation.width}
                            height={vkTranslation.height}
                            autoplay={1}
                        />
                    </div>
                    <h2 className={`hiddenToo ${isLoading ? 'hidden' : ''}`}>Записи матчей</h2>
                    <div className='lastephire'>
                        {vkLinks.map(video => (
                            <div className='ephir-1' key={video.id}>
                                <div className={`videosVk ${isLoading ? 'hidden' : ''}`}>
                                <CreateVideoFrame
                                    oid={video.oid}
                                    id={video.idVideo}
                                    hd={video.hd}
                                    width={1920}
                                    height={1080}
                                />
                                 <div className='video-info'>
                                        <p className='video-caption'>Запись матча {video.title}</p>
                                        <p className='video-score'>Счет: {video.scoreteam1} - {video.scoreteam2}</p>
                                        <p className='video-location'>Место: {video.location}</p>
                                        <p className='video-league'>Лига: {video.league}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Matches;
