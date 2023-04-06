import EncyclopedieSearch from '../pages/EncyclopedieSearch';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/style.scss';
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
            
            {encyclopedies.map(encyclopedie => 
                
                <div>
                  <a>{encyclopedie.Libelle}</a><br />
                  <a>{encyclopedie.tailleMin}</a><br />
                  <a>{encyclopedie.tailleMax}</a><br />
                  <a>{encyclopedie.dureeGestationJours}</a><br />
                  <a>{encyclopedie.duréeVie}</a><br />
                  <a>{encyclopedie.Description}</a><br />
                  <a>{encyclopedie.idEnclos}</a><br />
                  <a>{encyclopedie.Regime}</a><br />
                </div>
            )}
           
        </div>
    );
};
export default FicheEspece;