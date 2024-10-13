import React, {FC, useEffect} from 'react';
import {Navigate} from "react-router-dom";
import {store} from "../../index";

const RequireAuthFan: FC<any> = ({children}) => {
    const isAuth = store.isAuth;

    useEffect(() => {
        const checkAuthentication = async () => {
            if (!isAuth) {
                await store.checkAuth();
            }
        };

        checkAuthentication();
    }, [isAuth]);

    if (!isAuth){
        return <Navigate to='/'/>
    }
    return children;
};

export default RequireAuthFan;