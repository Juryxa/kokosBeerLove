import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import './AdminNav.css';
import {store} from "../../../index";


const AdminNav = () => {
    const navigate = useNavigate();
    const handleLogOut = () => {
        store.logout();
        navigate('/', {replace: true});
    }
    return (
        <div className='nav'>
            <Link to='/'>На главную</Link>
            <Link to='news'>Новости</Link>
            <Link to='matches'>Матчи</Link>
            <Link to='contacts'>Контакты</Link>
            <Link to="about">О клубе</Link>
            <Link to="shop">Магазин</Link>
            <button onClick={handleLogOut}>Выйти</button>
        </div>
    );
};

export default AdminNav;
