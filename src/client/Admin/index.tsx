import React from 'react';
import {Tabs} from 'antd';

import MovieList from './movieList';
import TheatreTables from './theatreTables';

const Admin: React.FC = () => {
    const tabItem = [
        {
            key:"1",
            label: "Movie List",
            children: <MovieList/>
        },
        {
            key:"2",
            label: "Theatre Tables",
            children: <TheatreTables/>
        }
    ]
    return (
        <div>
            <h1>Admin Panel</h1>
            <Tabs
                defaultActiveKey="1"
                items={tabItem}
                />
        </div>
    );
};

export default Admin;