import React, { FC, useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Matches.css';

const Matches: FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const vklink = "https://vk.com/video_ext.php?oid=-25924859&id=456239412&hd=3&autoplay=1";

    useEffect(() => {
        const iframe = document.querySelector('iframe');
        iframe?.addEventListener('load', () => setIsLoading(false));
    }, []);

    return (
        <div>
            <Header />
            <div className='container'>
                <h1>Матчи</h1>
                <div className='content'>
                    {isLoading && (
                        <div className='loading-spinner'></div>
                    )}
                    <div className={`videosVk ${isLoading ? 'hidden' : ''}`}>
                        <iframe
                            src={vklink}
                            width="1280"
                            height="720"
                            allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Matches;
