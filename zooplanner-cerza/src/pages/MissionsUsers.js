import React, { useEffect, useState } from 'react';
import '../css/style.scss';
import '../css/MissionsCardsUsers.scss';
import '../css/MissionsUsers.scss';
import MissionsCardsUsers from '../components/MissionsCardsUsers';
import MissionList from '../components/MissionList';

import axios from 'axios';



const MissionsUsers = () => {
    return (
        <div>
            <div className='MissionsUsersMainDiv'>
                <MissionsCardsUsers/>
            </div>
        </div>
        
    );
};
export default MissionsUsers;