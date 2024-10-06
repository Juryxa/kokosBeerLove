import React, {FC} from 'react';
import {Navigate} from "react-router-dom";
import {store} from "../../index";

const RequireAuth: FC<any> = ({children}) => {
    const auth = store.isAuth;

    // if (!auth){
    //     return <Navigate to='/'/>
    // }
    return children;
};

export default RequireAuth;