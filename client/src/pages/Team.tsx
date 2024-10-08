import React, { useEffect, useState } from 'react';
import './Team.css';
import player1 from '../images/player.jpeg';
import player2 from '../images/player1.jpg';
import data from './players.json';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BigBosses from '../components/BigBosses';

interface PlayerType {
    id: number;
    name: string;
    role: string;
    club: string;
    games: number;
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
    image: string;
}

const imageMapping: Record<string, string> = {
    player1: player1,
    player2: player2,
};

const Team = () => {
    const [players, setPlayers] = useState<PlayerType[]>([]);

    useEffect(() => {
        setPlayers(data.players);
    }, []);

    // Группировка игроков по ролям
    const groupedPlayers = players.reduce((acc: Record<string, PlayerType[]>, player) => {
        if (!acc[player.role]) {
            acc[player.role] = [];
        }
        acc[player.role].push(player);
        return acc;
    }, {});

    return (
        <div className="team-container">
            <Header/>

           

            <BigBosses/>
            <table className="team-table">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>ФИО</th>
                        <th>КЛУБ</th>
                        <th>ИГРЫ</th>
                        <th>ГОЛЫ</th>
                        <th>ПАСЫ</th>
                        <th><div style={{backgroundColor:"yellow",height:"20px",width:"15px",borderRadius:"5px" }}></div></th>
                        <th><div style={{backgroundColor:"red",height:"20px",width:"15px" , borderRadius:"5px"}}></div></th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(groupedPlayers).map((role) => (
                        <React.Fragment key={role}>
                            <tr className="category-row">
                                <td colSpan={8}>{role.toUpperCase()}</td>
                            </tr>
                            {groupedPlayers[role].map((player) => (
                                <tr key={player.id}>
                                    <td>{player.id}</td>
                                    <td>
                                        <div className="player-info">
                                            <img src={imageMapping[player.image]} alt={player.name} className="player-image" />
                                            <div className="player-name-role">
                                                <strong>{player.name}</strong>
                                                <span>{player.role}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{player.club}</td>
                                    <td>{player.games}</td>
                                    <td>{player.goals}</td>
                                    <td>{player.assists}</td>
                                    <td>{player.yellowCards}</td>
                                    <td>{player.redCards}</td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            <Footer/>
        </div>
    );
};

export default Team;
