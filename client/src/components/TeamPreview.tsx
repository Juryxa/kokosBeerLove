import React, {useEffect, useState} from 'react';
import {Box, Card, CardContent, Typography, Button} from '@mui/material';
import './TeamPreview.css';
import back from '../images/icons/Vector 5.png'
import next from '../images/icons/Vector 4.png'
import {TeamResponse} from "../api/models/response/TeamResponse";
import TeamService from "../api/services/TeamService";


const TeamPreview: React.FC = () => {
    const [currentPage, setCurrentPage] = React.useState(0);
    const [team, setTeam] = useState<TeamResponse[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // Для обработки ошибок
    const [isLoading, setIsLoading] = useState(false);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchTeam();
    }, []);

    const fetchTeam = async () => {
        setIsLoading(true);
        try {
            const response = await TeamService.getAllPlayers();
            setTeam(response.data);

        } catch (error) {
            setErrorMessage('Ошибка загрузки команды.');
        } finally {
            setIsLoading(false);
        }
    };

    const maxPages = Math.ceil(team.length / itemsPerPage) - 1;

    const handleNextPage = () => {
        if (currentPage < maxPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIndex = currentPage * itemsPerPage;
    const visibleItems = team.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className='command-cntainer'>
            <h1 className='command-h1'>Команда</h1>

            <div className="carousel-container">

                <div className="carousel-buttons"
                     style={{minWidth: '30px', padding: '0', width: '91px', height: '182px'}}>
                    {currentPage > 0 && ( // Отображаем кнопку "Назад" только если это не первая страница
                        <Button
                            onClick={handlePrevPage}
                            style={{
                                minWidth: '30px',
                                padding: '0',
                                width: '91px',
                                height: '182px'
                            }} // Убираем лишние отступы
                        >
                            <img src={back} alt='Назад'/>
                        </Button>
                    )}</div>

                <Box className="carousel-content">
                    {isLoading && <div className="loading-spinner"></div>}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    {visibleItems.map((item) => (
                        <Card key={item.id} className="carousel-item">
                            <img src={item.photo_url} alt={`${item.middle_name} ${item.first_name} ${item.last_name}`}
                                 className="carousel-image"/>
                            <CardContent>
                                <Typography
                                    variant="h5">{`${item.middle_name} ${item.first_name} ${item.last_name}`}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>


                <div className="carousel-buttons"
                     style={{minWidth: '30px', padding: '0', width: '91px', height: '182px'}}>
                    {currentPage < maxPages && ( // Отображаем кнопку "Вперёд" только если это не последняя страница
                        <Button
                            onClick={handleNextPage}

                        >
                            <img src={next} alt='Вперёд'/>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeamPreview;
