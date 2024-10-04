import React, {useContext, useState, useEffect} from 'react';
import './App.css';
import MainPage from './pages/MainPage';
import FanPage from './pages/FanPage';
import {Route, Routes} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import EnterForm from "./pages/EnterForm";
import Matches from './pages/Matches';


function App() {
    const tabloinfo = {
        title: "Высший дивизион 25 ТУР",
        date: "20.10.2024",
        day: 'Четверг',
        time: "14:00",
        score: "2 - 1"
    };

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
                <Route path="/" element={<MainPage tabloinfo={tabloinfo}/>}/>
                <Route path="/enter" element={store.isAuth ? <FanPage/> : <EnterForm/>}/>
                <Route path="/matches" element={<Matches/>}/>
            </Routes>
        </div>
    );
}

export default observer(App);
