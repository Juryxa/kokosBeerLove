import React from 'react';
import Header from '../components/Header';
import img1 from '../images/rectangle1.png';
import logoTeam1 from '../images/logoteam1.png';
import logoTeam2 from '../images/logo2.png';

interface tabloinfo {
    title:string;
    data: string,
    day: string,
    time: string,
    score:string,
}

interface MainPageProps {
    tabloinfo: tabloinfo; // Использование интерфейса DataTime
}


const MainPage:React.FC<MainPageProps> = ({tabloinfo}) => {
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Header />

            <div style={{ backgroundImage: `url(${img1})`, height: '600px', width: '1380px', }}>

                <div className='matchBlock' style={{display: 'flex', height:"80%",
            flexDirection: 'column', alignItems: 'center',justifyContent:"space-between" ,padding:"5px"}}>

                <div className='titleMatch' style={{color:"white",fontSize:"25px"}}><h1>{tabloinfo.title}</h1></div>
                <div className='dataInfo'>
                    <div style={{fontSize:"25px",color:"white"}}>{tabloinfo.data} - {tabloinfo.day} - {tabloinfo.time}</div>
                </div>
                {/* Логотипы команд */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <img src={logoTeam1} alt="Team 1" style={{ width: '60px', height: 'auto', marginRight: '10px' }} /> {/* Увеличиваем размер */}
                    <h1 style={{ fontSize: '80px', margin: '0 20px',color:"white" }}>{tabloinfo.score}</h1> {/* Счет */}
                    <img src={logoTeam2} alt="Team 2" style={{ width: '60px', height: 'auto', marginRight: '10px' }} /> {/* Увеличиваем размер */}
                </div>
                {/* Дополнительные элементы, например, кнопка "О матче" */}
                <button style={{
                    padding: '10px 50px',
                    fontSize: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}>
                    О матче
                </button>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
