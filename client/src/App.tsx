import React, {useContext, useEffect} from 'react';
import './App.css';
import MainPage from './pages/generalPages/MainPage';
import {Route, Routes} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import Matches from './pages/generalPages/Matches';
import AdminPage from "./pages/generalPages/AdminPage";
import NewsAdmin from "./pages/adminPages/NewsAdmin";
import MatchesAdmin from "./pages/adminPages/MatchesAdmin";
import AboutClubAdmin from "./pages/adminPages/AboutClubAdmin";
import ContactsAdmin from "./pages/adminPages/ContactsAdmin";
import ShopAdmin from "./pages/adminPages/ShopAdmin";
import NotFound from "./pages/generalPages/NotFound";
import RequireAuth from "./pages/hoc/RequireAuth";
import News from "./pages/generalPages/News";
import AboutClub from "./pages/generalPages/AboutClub";
import Shop from "./pages/generalPages/Shop";
import Team from "./pages/generalPages/Team";
import NewsDetails from './pages/generalPages/NewsDetails';
import UserProfile from './pages/generalPages/UserProfile';


function App() {

    const {store} = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, []);

    if (store.isLoading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/matches" element={<Matches/>}/>
                <Route path='/news' element={<News/>}/>
                <Route path="/news/:id" element={<NewsDetails />} />
                <Route path='/about' element={<AboutClub/>}/>
                <Route path='/shop' element={<Shop/>}/>
                <Route path='/team' element={<Team/>}/>
                <Route path='/admin/' element={<RequireAuth><AdminPage/></RequireAuth>}>
                    <Route path="news" element={<NewsAdmin/>}/>
                    <Route path="matches" element={<MatchesAdmin/>}/>
                    <Route path="contacts" element={<ContactsAdmin/>}/>
                    <Route path="about" element={<AboutClubAdmin/>}/>
                    <Route path="shop" element={<ShopAdmin/>}/>
                </Route>
                <Route path='/fan' element={<RequireAuth><UserProfile/></RequireAuth>}/>
                <Route path='*' element={<NotFound/>}/>
                <Route path='/test' element={<UserProfile/>}/>
            </Routes>
        </div>
    );
}

export default observer(App);
