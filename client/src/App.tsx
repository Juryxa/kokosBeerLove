import React, {useContext, useEffect} from 'react';
import './App.css';
import MainPage from './pages/MainPage';
import FanPage from './pages/FanPage'; // Подключаем компонент FanPage
import {Route, Routes} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import EnterForm from "./pages/EnterForm";

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
                <Route path="/" element={<MainPage />} />
                <Route path="/enter" element={store.isAuth ? <FanPage /> : <EnterForm />} />
            </Routes>
        </div>
    );
}

export default observer(App);
