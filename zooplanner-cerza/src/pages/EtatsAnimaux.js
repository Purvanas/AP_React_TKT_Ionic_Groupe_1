import React, { useEffect, useState } from 'react';
import '../css/style.scss';
import '../css/AnimalCard.scss';
import Header from '../components/Header';

import EncyclopedieCard from '../components/AnimalCard';
import axios from 'axios';
import AnimalCard from '../components/AnimalCard';



const EncyclopedieSearch = () => {


    return (
        <div>
          <div id="backGround">
          <Header/>
          <AnimalCard/>
          </div>
        </div>

    );
};
export default EncyclopedieSearch;