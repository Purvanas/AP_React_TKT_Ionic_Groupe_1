import EncyclopedieSearch from '../pages/EncyclopedieSearch';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/style.scss';
import '../css/EncyclopedieFiche.scss';

import Header from '../components/Header';

const api = "http://localhost:8080/";

const FicheEspece = () => {
    const { idEspece } = useParams();
    const [encyclopedies, setEncyclopedies] = useState([]);
    useEffect(() => {
      try {     
      const fetchData = async () => {
        const response = await axios.get(api +`EncyclopedieFiche/${idEspece}`);
        setEncyclopedies(response.data.results);
        console.log(response.data.results);
      };
      fetchData();
    } catch (error) {
      console.error(error);
    }
    }, []);
  
    
    return (
      <div>
        <div id="backGround">
      <Header/>
        <div className='divFicheEncycloAll'>

{encyclopedies.map(encyclopedie => 
         <div>
        <div className="divFicheEncyclo">
          <img className='animal' src={require(`../Img/${encyclopedie.lienImg}`)} />
        </div>
          <h1>{encyclopedie.Libelle}</h1> 
        <div className='divGridFicheEncyclo'>
        <div className='divFactFicheEncyclo'>
          <p className="infoAnimal">Taille : {encyclopedie.tailleMin}-{encyclopedie.tailleMax} cm</p>  
          <p className="infoAnimal">Poids : {(encyclopedie.poidsMin)/1000}-{(encyclopedie.poidsMax)/1000} kg</p>  
          <p className="infoAnimal">Régime alimentaire : {encyclopedie.Regime}</p>  
          <p className="infoAnimal">Espérance de vie : {encyclopedie.duréeVie} ans</p>  
          <p className="infoAnimal">Durée de gestation : {(encyclopedie.dureeGestationJours)/30} mois </p>  
          <p className="infoAnimal">Enclos : {encyclopedie.idEnclos}</p>  
        </div>
        <div className='divDesciptionFicheEncyclo'>
          <p className="infoAnimal">Description : {encyclopedie.Description}</p> 
        </div>
      </div>
      </div>
  
  
)}
</div>
</div>
</div>
        
    );
};
export default FicheEspece;