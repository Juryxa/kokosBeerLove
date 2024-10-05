import React, {FC} from 'react';
import {store} from "../index";

const AdminPage: FC = () => {
    return (
        <div>
            Это панель админа
            <button onClick={() => store.logout()}>Выйти</button>
        </div>
    );
};

export default AdminPage;