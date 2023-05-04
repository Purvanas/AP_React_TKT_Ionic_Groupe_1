import React, { useEffect, useState } from 'react';
import '../css/style.scss';
import '../css/EncyclopedieCard.scss';
import Header from '../components/Header';

import EncyclopedieCard from '../components/EncyclopedieCard';
import axios from 'axios';



const EncyclopedieSearch = () => {


    return (
        <div>
          <div id="backGround">
          <Header/>
          <EncyclopedieCard/>
          </div>
        </div>

    );
};
export default EncyclopedieSearch;