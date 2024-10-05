import React, { FC, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import data from './matches.json'; // Импортируем JSON файл
import "./MatchesPreview.css"
import logo1 from '../images/logoteam1.png'
import logo2 from '../images/logo2.png'

interface Match {
  type: string;
  division: string;
  date: string;
  score: string;
  location: string;
  
}

interface Stats {
  games: number;
  wins: number;
  goals: number;
  tournaments: number;
}

const MatchCard: FC<{ match: Match }> = ({ match }) => (
    <div className="card" >
      <h5>{match.type}</h5>
      <div className='card-content'>
      <h6>{match.division}</h6>
      <p>{match.date}</p>
      <h4>{match.score}</h4>
      <p>{match.location}</p>
      </div>
    </div>
  );
  
  const StatsCard: FC<{ stats: Stats }> = ({ stats }) => (
    <div className="stats-card">
      <h5>Статистика</h5>
      <div className='stats-card-content'>
      <h6>Игры: {stats.games}</h6>
      <p>Победы: {stats.wins}</p>
      <p>Голы: {stats.goals}</p>
      <p>Турниры: {stats.tournaments}</p>
      </div>
    </div>
  );

const MatchesPreview: FC = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
  
    useEffect(() => {
      setMatches(data.matches);
      setStats(data.stats);
    }, []);
  
    return (
      <div className="container_matches">
        {matches.map((match, index) => (
          <MatchCard key={index} match={match} />
        ))}
        {stats && <StatsCard stats={stats} />}
      </div>
    );
  };

export default MatchesPreview;
