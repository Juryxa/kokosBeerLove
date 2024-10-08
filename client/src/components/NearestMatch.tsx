import React from 'react';
import img1 from "../images/rectangle1.png";
import logoTeam1 from "../images/logoteam1.png";
import logoTeam2 from "../images/logo2.png";
import './NearestMatch.css';
import { Link } from 'react-router-dom';

interface tabloinfo {
    title: string;
    date: string,
    day: string,
    time: string,
    score: string,
}

interface NearestMatchProps {
    tabloinfo: tabloinfo;
}

const NearestMatch: React.FC<NearestMatchProps> = ({tabloinfo}) => {
    return (
        <div style={{
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            backgroundImage: `url(${img1})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '60vh',
            width: '80%',
        }}>

            <div className='matchBlock' style={{
                display: 'flex', height: "80%",
                flexDirection: 'column', alignItems: 'center', justifyContent: "space-between", padding: "5px"
            }}>
                <div className='titleWrapper'
                     style={{width: '100%', display: 'flex', justifyContent: 'flex-start', marginLeft: '15px'}}>
                    <div className='titleMatch'>
                        <h1>{tabloinfo.title.toUpperCase()}</h1>
                    </div>
                </div>
                <div className='dateInfo'>
                    <div>{tabloinfo.date} — {tabloinfo.day} — {tabloinfo.time}</div>
                </div>
                {/* Логотипы команд */}
                <div className='logosTeams' style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
                    <img src={logoTeam1} alt="Team 1" style={{
                        marginRight: '10px'
                    }}/> {/* Увеличиваем размер */}
                    <h1 className='count'>{tabloinfo.score}</h1> {/* Счет */}
                    <img src={logoTeam2} alt="Team 2" style={{
                        marginRight: '10px'
                    }}/> {/* Увеличиваем размер */}
                </div>
                {/* Дополнительные элементы, например, кнопка "О матче" */}
                <Link to="/matches">
                        <button className="styled-button">
                            О матче
                        </button>
                    </Link>
            </div>
        </div>
    );
};

export default NearestMatch;