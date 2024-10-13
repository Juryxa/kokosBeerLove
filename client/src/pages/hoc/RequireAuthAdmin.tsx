import React, {FC, useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import {store} from "../../index";


const RequireAuthAdmin: FC<any> = ({children}) => {
    const isAuth = store.isAuth;
    const isSuperUser = store.isSuperUser;
    useEffect(() => {
        const checkAuthentication = async () => {
            if (!isAuth) {
                await store.checkAuth();
            }
        };

        checkAuthentication();
    }, [isAuth]);

    if (!isAuth && !isSuperUser) {
        return <Navigate to="/" />;
    }
    return children;
};

export default RequireAuthAdmin;
