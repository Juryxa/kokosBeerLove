import React, { FC, useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Matches.css';
import mathes from './Mathes.json';
import translation from './Translation.json';
import CreateVideoFrame from '../../components/CreateVideoFrame';
import { useNavigate } from 'react-router-dom';
import { TextField, Box, List, ListItemButton, ListItemText } from '@mui/material';

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
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<MatchesType[]>([]);

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
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setVideosToShow(window.innerWidth < 768 ? 2 : 4);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleShowMore = () => {
        setVideosToShow((prevCount) => prevCount + (isMobile ? 4 : 8));
    };

    const navigate = useNavigate();

    const handleCardClick = (id: number | undefined) => {
        if (id) {
            navigate(`/match/${id}`);
        }
    };

    // Обработчик изменения поля поиска
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
        if (query) {
            const filteredMatches = mathesData.filter((match) =>
                match.data?.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filteredMatches);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (id: number) => {
        navigate(`/match/${id}`);
    };

    return (
        <div>
            <Header />
            <div className="container">
                <h1 className={`hiddenToo ${isLoading ? 'hidden' : ''}`}>Матчи</h1> {/* Заголовок красного цвета */}
                <Box mb={3} >
                    <TextField
                        label="Поиск матчей"
                        variant="outlined"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className={`searchMAtch ${isLoading ? 'hidden' : ''}`}
                        sx={{
                            width: '300px', // Уменьшаем ширину строки поиска
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'red', // Красная рамка
                                },
                                '&:hover fieldset': {
                                    borderColor: 'darkred', // Более темная красная рамка при наведении
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'red', // Красная рамка при фокусе
                                },
                            },
                        }}
                        InputLabelProps={{
                            sx: { color: 'red' }, // Красный цвет для надписи
                        }}
                    />
                    {suggestions.length > 0 && (
                        <List>
                            {suggestions.map((match) => (
                                <ListItemButton
                                    key={match.id}
                                    onClick={() => handleCardClick(match.id)}
                                    sx={{ width: '200px' }}
                                >
                                    <ListItemText primary={match.data} />
                                </ListItemButton>
                            ))}
                        </List>
                    )}
                </Box>
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
