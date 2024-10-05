import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NearestMatch from "../components/NearestMatch";

const tabloinfo = {
    title: "Высший дивизион 25 ТУР",
    date: "20.10.2024",
    day: 'Четверг',
    time: "14:00",
    score: "2 - 1"
};

const MainPage: React.FC = () => {

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <Header/>
            <NearestMatch tabloinfo={tabloinfo}/>
            <Footer/>
        </div>
    );
};

export default MainPage;
