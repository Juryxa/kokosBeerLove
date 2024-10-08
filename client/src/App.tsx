import React, {useContext, useEffect} from 'react';
import './App.css';
import MainPage from './pages/MainPage';
import {Route, Routes} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import Matches from './pages/Matches';
import AdminPage from "./pages/AdminPage";
import FanPage from "./pages/FanPage";
import NewsAdmin from "./pages/adminPages/NewsAdmin";
import MatchesAdmin from "./pages/adminPages/MatchesAdmin";
import AboutClubAdmin from "./pages/adminPages/AboutClubAdmin";
import ContactsAdmin from "./pages/adminPages/ContactsAdmin";
import ShopAdmin from "./pages/adminPages/ShopAdmin";
import NotFound from "./pages/NotFound";
import RequireAuth from "./pages/hoc/RequireAuth";
import News from "./pages/News";
import AboutClub from "./pages/AboutClub";
import Shop from "./pages/Shop";
import {Co2} from "@mui/icons-material";
import Team from "./pages/Team";
import NewsDetails from './pages/NewsDetails';


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
                <Route path="/news/:newsId" element={<NewsDetails />} />
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
                <Route path='/fan' element={<RequireAuth><FanPage/></RequireAuth>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </div>
    );
}

export default observer(App);
