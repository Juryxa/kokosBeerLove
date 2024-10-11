import React, {Suspense} from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import NearestMatch from "../../components/NearestMatch";
import './MainPage.css';

const ShopPreview = React.lazy(() => import('../../components/ShopPreview'));
const NewsPreview = React.lazy(() => import('../../components/NewsPreview'));
const ClubPreview = React.lazy(() => import('../../components/ClubPreview'));
const MatchesPreview = React.lazy(() => import('../../components/MatchesPreview'));
const TeamPreview = React.lazy(() => import('../../components/TeamPreview'));

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

                <NearestMatch />
                <MatchesPreview/>
                 <Suspense fallback={<div className="loading-spinner"></div>}> 

                <Suspense fallback={<div className="loading-spinner"></div>}>
                    <NearestMatch/>
                    <MatchesPreview/>
                    </Suspense>
                    <NewsPreview/>
                </Suspense>
            </div>
            <Suspense fallback={<div className="loading-spinner"></div>}>
                <ClubPreview/>
                <TeamPreview/>
                <ShopPreview/>
              </Suspense> 
            <Footer/>
        </div>
    );
};

export default MainPage;
