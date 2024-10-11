import React, { FC, useEffect, useState } from 'react';
import "./MatchesPreview.css";
import MatchService from "../api/services/MatchService";
import { MatchResponse } from '../api/models/response/MatchResponse';
import { AboutResponse } from "../api/models/response/AboutResponse";
import AboutService from "../api/services/AboutService";

function getWeekDay(date: Date) {
    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    return days[date.getDay()];
}

const MatchCard: FC<{ match: MatchResponse, index: number }> = ({ match, index }) => (
    <div className="card">
        <h5>{index === 0 ? 'Следующий матч' : 'Предыдущий матч'}</h5>
        <div className='card-content'>
            <h5>{match.division}</h5>
            <h6>{match.team_home} - {match.team_away_name}</h6>
            <p>{match.match_date} - {getWeekDay(new Date(match.match_date))} - {match.match_time}</p>
            <h4>{match.score_home} - {match.score_away}</h4>
            <p>{match.location}</p>
        </div>
    </div>
);

const StatsCard: FC<{ stats: AboutResponse }> = ({ stats }) => (
    <div className="stats-card">
        <h5>Статистика</h5>
        <div className='stats-card-content'>
            <h6>Игры: {stats.games_played}</h6>
            <p>Победы: {stats.wins}</p>
            <p>Голы: {stats.goals_scored}</p>
            <p>Турниры: {stats.tournaments}</p>
        </div>
    </div>
);

const MatchesPreview: FC = () => {
    const [matches, setMatches] = useState<MatchResponse[]>([]);  // Используем интерфейс MatchResponse для типа матчей
    const [stats, setStats] = useState<AboutResponse | null>(null); // Статистика
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // Для обработки ошибок
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchMatches();
    }, []);

    const fetchMatches = async () => {
        setIsLoading(true);
        try {
            const upComingResponse = await MatchService.getUpComing();
            const lastTwoResponse = await MatchService.getLastTwo();

            // Комбинируем два результата в массив
            const combinedMatches = [upComingResponse.data[0], lastTwoResponse.data[0]];
            setMatches(combinedMatches);

            const statsResponse = await AboutService.getInfoClub();
            setStats(statsResponse.data);
        } catch (error) {
            setErrorMessage('Ошибка загрузки матчей.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container_matches">
            {isLoading && <div className="loading-spinner"></div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            {matches.map((match, index) => (
                <MatchCard key={match.id} match={match} index={index} />
            ))}

            {stats && <StatsCard stats={stats} />}
        </div>
    );
};

export default MatchesPreview;
