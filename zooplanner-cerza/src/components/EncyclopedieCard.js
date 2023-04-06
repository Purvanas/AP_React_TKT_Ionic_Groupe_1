import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../css/style.scss';
import '../css/EncyclopedieCard.scss';
import FicheEspece from '../pages/FicheEspece';

const api = "http://localhost:8080/";

const EncyclopedieCard = () => {
    const [encyclopedies, setEncyclopedies] = useState([]);
    const [encyclopediesFilter, setEncyclopediesFilter] = useState([]);
    useEffect(() => {
      try {     
      const fetchData = async () => {
        const response = await axios.get(api +`EncyclopedieCard`);
        setEncyclopedies(response.data.results);
        setEncyclopediesFilter(response.data.results);
        console.log(response.data.results);
      };
      fetchData();
    } catch (error) {
      console.error(error);
    }
    }, []);

    const handleChange = (event) => {
      event.preventDefault();
      setEncyclopediesFilter(encyclopedies.filter(uneEncyclopedies => uneEncyclopedies.Libelle.toLowerCase().includes(event.target.value)));
};
   
    return (
      <div>
        <div className="searchDiv">
            <input type={Text} onChange={handleChange}></input>
        </div>
        <div className="cards">
              {encyclopediesFilter.map(encyclopedie => 
                
                  <div class="card" onClick={FicheEspece}>
                    <div class="container">
                        <img src={require(`../Img/${encyclopedie.lienImg}`)} />
                    </div>
                    <div class="details">
                        <h3>Espece : {encyclopedie.Libelle}</h3>
                        <p>Enclos : {encyclopedie.idEnclos}</p>
                    </div>
                  </div>
              )}
        </div>
      </div>  
    );

}

export default EncyclopedieCard;