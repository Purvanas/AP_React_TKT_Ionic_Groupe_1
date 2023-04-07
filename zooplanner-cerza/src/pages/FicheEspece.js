import EncyclopedieSearch from '../pages/EncyclopedieSearch';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/style.scss';
import '../css/EncyclopedieFiche.scss';

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
  
    const dayToMonth = (duree) => {
      var month = ({duree}/30);
      console.log(month);
      return month;
    };

    return (
        <div>
            
            {encyclopedies.map(encyclopedie => 
                
                <div>
                  <div className="divFicheEncyclo">
                    <img src={require(`../Img/${encyclopedie.lienImg}`)} />
                    </div>
                      <h1>{encyclopedie.Libelle}</h1><br />
                    <div className='divGridFicheEncyclo'>
                    <div className='divFactFicheEncyclo'>
                      <a>Taille : {encyclopedie.tailleMin}-{encyclopedie.tailleMax}cm</a><br />
                      <a>Régime alimentaire : {encyclopedie.Regime}</a><br />
                      <a>Espérance de vie : {encyclopedie.duréeVie} ans</a><br />
                      <a>Durée de gestation : {encyclopedie.dureeGestationJours} jours </a><br />
                      <a>Enclos : {encyclopedie.idEnclos}</a><br />
                    </div>
                    <div className='divDesciptionFicheEncyclo'>
                      <a>Description : {encyclopedie.Description}</a><br />
                    </div>
                  </div>
                </div>
            )}
           
        </div>
    );
};
export default FicheEspece;