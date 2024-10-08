import React, {useState, useEffect} from 'react';
import {Edit as EditIcon, Delete as DeleteIcon} from '@mui/icons-material';
import MatchesService from '../../api/services/MatchService';
import {MatchResponse} from '../../api/models/response/MatchResponse';
import './MatchesAdmin.css';
import { uploadImage } from './functions/uploadImage';

const MatchesAdmin = () => {
    const [team1, setTeam1] = useState('');
    const [team2, setTeam2] = useState('');
    const [opponentEmblem, setOpponentEmblem] = useState('');
    const [score1, setScore1] = useState<number>(0);
    const [score2, setScore2] = useState<number>(0);
    const [venue, setVenue] = useState('');
    const [league, setLeague] = useState('');
    const [vkVideoLink, setVkVideoLink] = useState('');
    const [matchDate, setMatchDate] = useState('');
    const [matchTime, setMatchTime] = useState('');
    const [matchesList, setMatchesList] = useState<MatchResponse[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editMatchId, setEditMatchId] = useState<number | null>(null);
    const [originalMatch, setOriginalMatch] = useState<MatchResponse | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        fetchMatches();
    }, []);

    const fetchMatches = async () => {
        try {
            const response = await MatchesService.getAllMatches();
            setMatchesList(response.data);
        } catch (error) {
            setErrorMessage('Ошибка загрузки матчей.');
        }
    };

    const handleAddOrUpdateMatch = async () => {
        if (!team1 || !team2 || !matchDate || !matchTime || !venue || !league) {
            setErrorMessage('Заполните все обязательные поля!');
            return;
        }

        try {
            const formattedDate = new Date(`${matchDate}T${matchTime}`);

            if (isEditing && editMatchId !== null) {
                await MatchesService.updatePartMatch(editMatchId,
                    team1, team2, opponentEmblem, score1, score2, venue, league, vkVideoLink, formattedDate.toISOString(), matchTime
                );
                setSuccessMessage('Матч обновлен.');
            } else {
                await MatchesService.createMatch(
                    team1, team2, opponentEmblem, score1, score2, venue, league, vkVideoLink, formattedDate.toISOString(), matchTime
                );
                setSuccessMessage('Матч добавлен.');
            }

            // Очистка формы
            setTeam1('');
            setTeam2('');
            setOpponentEmblem('');
            setScore1(0);
            setScore2(0);
            setVenue('');
            setLeague('');
            setVkVideoLink('');
            setMatchDate('');
            setMatchTime('');
            setIsEditing(false);
            setEditMatchId(null);
            setOriginalMatch(null);

            await fetchMatches();
        } catch (error) {
            setErrorMessage('Ошибка при сохранении матча.');
        }
    };

    // Функция для загрузки изображения
    const handleUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
            const imageUrl = await uploadImage(file, setSuccessMessage, setErrorMessage);
            if (imageUrl) {
                setOpponentEmblem(imageUrl);  // Сохраняем URL загруженного изображения
            }
        } else {
            setErrorMessage('Пожалуйста, загрузите изображение в формате PNG или JPEG.');
        }
    };

    const handleEditMatch = async (matchId: number) => {
        try {
            const response = await MatchesService.getMatchId(matchId);
            const match = response.data;

            setTeam1(match.team1);
            setTeam2(match.team2);
            setOpponentEmblem(match.opponentEmblem);
            setScore1(match.score1);
            setScore2(match.score2);
            setVenue(match.venue);
            setLeague(match.league);
            setVkVideoLink(match.vkVideoLink);
            setMatchDate(match.matchDate.split('T')[0]);
            setMatchTime(match.matchTime);
            setIsEditing(true);
            setEditMatchId(match.id);
            setOriginalMatch(match);
        } catch (error) {
            setErrorMessage('Ошибка при загрузке матча для редактирования.');
        }
    };

    const handleDeleteMatch = async (id: number) => {
        try {
            await MatchesService.deleteMatch(id);
            setSuccessMessage('Матч удален.');
            await fetchMatches();
        } catch (error) {
            setErrorMessage('Ошибка при удалении матча.');
        }
    };

    return (
        <div className="matches-admin-container">
            <h2 className="matches-admin-title">{isEditing ? 'Редактировать матч' : 'Добавить матч'}</h2>

            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            <input
                type="text"
                className="matches-admin-input"
                placeholder="Наша команда"
                value={team1}
                onChange={(e) => setTeam1(e.target.value)}
            />
            <input
                type="text"
                className="matches-admin-input"
                placeholder="Команда 2"
                value={team2}
                onChange={(e) => setTeam2(e.target.value)}
            />

            {/* Кнопка для загрузки изображения */}
            <label>Эмблема команды противника</label>
            <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleUploadImage}
                className="matches-admin-input"
            />
            {opponentEmblem && <img src={opponentEmblem} alt="Эмблема команды противника" className="match-image"/>}

            <input
                type="number"
                className="matches-admin-input"
                placeholder="Счет нашей команды"
                value={score1}
                min="0"
                onChange={(e) => {
                    const value = Math.max(0, Number(e.target.value));
                    setScore1(value);
                }}
                onBlur={(e) => {
                    if (Number(e.target.value) < 0) setScore1(0); // Установка значения не меньше 0 при потере фокуса
                }}
            />

            <input
                type="number"
                className="matches-admin-input"
                placeholder="Счет команды 2"
                value={score2}
                min="0"
                onChange={(e) => {
                    const value = Math.max(0, Number(e.target.value));
                    setScore2(value);
                }}
                onBlur={(e) => {
                    if (Number(e.target.value) < 0) setScore2(0);
                }}
            />

            <input
                type="text"
                className="matches-admin-input"
                placeholder="Место проведения матча"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
            />
            <input
                type="text"
                className="matches-admin-input"
                placeholder="Лига"
                value={league}
                onChange={(e) => setLeague(e.target.value)}
            />
            <input
                type="text"
                className="matches-admin-input"
                placeholder="Ссылка на ВК видео"
                value={vkVideoLink}
                onChange={(e) => setVkVideoLink(e.target.value)}
            />
            <input
                type="text"
                className="matches-admin-input"
                placeholder="Дата матча (чч.мм.гггг)"
                value={matchDate}
                onChange={(e) => setMatchDate(e.target.value)}
            />
            <input
                type="text"
                className="matches-admin-input"
                placeholder="Время матча (чч:мм)"
                value={matchTime}
                onChange={(e) => setMatchTime(e.target.value)}
            />

            <button className="matches-admin-button" onClick={handleAddOrUpdateMatch}>
                {isEditing ? 'Сохранить изменения' : 'Добавить матч'}
            </button>

            <div className="matches-list">
                <h3 className="matches-list-title">Список матчей</h3>
                <ul className="matches-list-items">
                    {Array.isArray(matchesList) && matchesList.length > 0 ? (
                        matchesList.map((match) => (
                            <li key={match.id} className="matches-list-item">
                                <div className="matches-list-item-content">
                                    <h4>{match.team_home} vs {match.team_away_name}</h4>
                                    <p>Счет: {match.score_home} - {match.score_away}</p>
                                    <p>Лига: {match.division}</p>
                                    <p>Место: {match.location}</p>
                                    <p>Дата: {match.match_date}, Время: {match.match_time}</p>
                                    {match.team_away_logo_url &&
                                        <img src={match.team_away_logo_url} alt="Эмблема команды"
                                             className="match-image"/>}
                                </div>
                                <div className="matches-list-item-actions">
                                    <button onClick={() => handleEditMatch(match.id)} className="edit-button">
                                        <EditIcon/>
                                    </button>
                                    <button onClick={() => handleDeleteMatch(match.id)} className="delete-button">
                                        <DeleteIcon/>
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>Матчей нет</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default MatchesAdmin;
