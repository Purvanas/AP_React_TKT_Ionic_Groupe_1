import React, { useEffect, useState } from 'react';
import '../css/style.scss';
import '../css/MissionsCardsUsers.scss';
import '../css/MissionsUsers.scss';
import MissionsCardsUsers from '../components/MissionsCardsUsers';
import axios from 'axios';


const MissionsUsers = () => {


    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/UsersMissions").then((response) => {
            console.log(response.data.result);
            setData(response.data.result);
        })
    }, []);


    return (
        <div>
            <div className='MissionsUsersMainDiv'>
                <MissionsCardsUsers/>
                <MissionsCardsUsers/>
            </div>
        </div>
        
    );
};
export default MissionsUsers;