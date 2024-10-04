import React, { FC, useContext, useState } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import Header from "../components/Header";

const EnterForm: FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true); // состояние для переключения между логином и регистрацией
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { store } = useContext(Context);

    const handleSubmit = () => {
        if (isLogin) {
            store.login(email, password);
        } else {
            store.registration(email, password);
        }
    };

    return (
        <div>
            <Header/>
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder='Email'
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder='Пароль'
            />
            <button onClick={handleSubmit}>
                {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </button>
            <div>
                {isLogin ? (
                    <p>Нет аккаунта? <button onClick={() => setIsLogin(false)}>Зарегистрироваться</button></p>
                ) : (
                    <p>Уже есть аккаунт? <button onClick={() => setIsLogin(true)}>Войти</button></p>
                )}
            </div>
        </div>
    );
};

export default observer(EnterForm);
