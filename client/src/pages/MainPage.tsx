import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NearestMatch from "../components/NearestMatch";
import MatchesPreview from "../components/MatchesPreview";
import NewsPreview from "../components/NewsPreview";
import ClubPreiew from '../components/ClubPreview'

const tabloinfo = {
    title: "Высший дивизион 25 ТУР",
    date: "20.10.2024",
    day: 'Четверг',
    time: "14:00",
    score: "2 - 1"
};

const MainPage: React.FC = () => {

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%'
        }}>
            <Header/>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                background: `linear-gradient(180deg, rgba(227,39,38,0) 0%, rgba(0,0,0,0) 0%, rgba(227,38,39,0.5) 50%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.7) 50%, rgba(227,39,38,0.5) 50%, rgba(0,0,0,0) 100%, rgba(227,39,38,0) 100%)`
            }}>
                <NearestMatch tabloinfo={tabloinfo}/>
                <MatchesPreview/>
                <NewsPreview/>
                <ClubPreiew/>

            </div>
            <Footer/>
        </div>
    );
};

export default MainPage;
