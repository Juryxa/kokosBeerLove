import React from 'react';
import Header from '../components/Header';
import img1 from '../images/rectangle1.png'
import logoTeam1 from '../images/logoteam1.png'
import logoTeam2 from '../images/logo2.png'




const MainPage = () => {
    

    return (
        <div style={{display:'flex',justifyContent:"center",alignContent:"center",flexWrap:"wrap"}}>
            <Header/>

            
            <div style={{backgroundImage:`url(${img1})`,height:"600px",width:"1380px"}}>
             {/* Логотипы команд */}
             <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <img src={logoTeam1} alt="Team 1" style={{ width: '100px', marginRight: '10px' }} />
                <h1 style={{ fontSize: '80px', margin: '0 20px' }}>1 - 1</h1> {/* Счет */}
                <img src={logoTeam2} alt="Team 2" style={{ width: '100px', marginLeft: '10px' }} />
            </div>
            {/* Дополнительные элементы, например, кнопка "О матче" */}
            <button style={{
                padding: '10px 20px',
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
    );
};

export default MainPage;