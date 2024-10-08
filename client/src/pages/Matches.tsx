/* eslint-disable jsx-a11y/iframe-has-title */
import React, { FC, useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Matches.css';
import CreateVideoFrame from '../components/CreateVideoFrame'; // Импортируем компонент

const Matches: FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const vkTranslation = {
        oid: '-25924859',
        id: '456239412',
        hd: 3,
        width: 1280,
        height: 720,
    };

    const vkLinks = [
        { id: 1, oid: '-170578', idVideo: '456241163', hd: 4,"title":"24.08.99" },
        { id: 2, oid: '-55072656', idVideo: '456239074', hd: 4,"title":"24.08.99" },
        { id: 3, oid: '-55072656', idVideo: '456239074', hd: 4,"title":"24.08.99" },
        { id: 4, oid: '-2000965537', idVideo: '125965537', hd: 4,"title":"24.08.99" },
        { id: 5, oid: '-170578', idVideo: '456241163', hd: 4,"title":"24.08.99" },
        { id: 6, oid: '-55072656', idVideo: '456239074', hd: 4,"title":"24.08.99" },
        { id: 7, oid: '-55072656', idVideo: '456239074', hd: 4,"title":"24.08.99" },
        { id: 8, oid: '-2000965537', idVideo: '125965537', hd: 4,"title":"24.08.99" },
        { id: 9, oid: '-170578', idVideo: '456241163', hd: 4,"title":"24.08.99" },
        { id: 10, oid: '-55072656', idVideo: '456239074', hd: 4,"title":"24.08.99" },
        { id: 11, oid: '-55072656', idVideo: '456239074', hd: 4,"title":"24.08.99" },
        { id: 12, oid: '-2000965537', idVideo: '125965537', hd: 4,"title":"24.08.99" },
        
    ];

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
                                 <p className='video-caption'>Запись матча  {video.title}</p>
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
