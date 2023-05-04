import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../css/style.scss';
import '../css/EncyclopedieCard.scss';
import FicheEspece from '../pages/FicheEspece';
import { useNavigate } from "react-router-dom";
 
const api = "http://localhost:8080/";
 
const EncyclopedieCard = () => {
    const navigate = useNavigate();
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
    const handleCardClick = (id) => {
      navigate(`/FicheEncyclopedie/${id}`);
    };
    const handleChange = (event) => {
      event.preventDefault();
      setEncyclopediesFilter(encyclopedies.filter(uneEncyclopedies => uneEncyclopedies.Libelle.toLowerCase().includes(event.target.value)));
};
   
    return (
      <div className="encyclopedieCards">
        <div className="searchDiv">
            <input type={Text} onChange={handleChange} placeholder="Recherche..."></input>
        </div>
        <div className="cards">
              {encyclopediesFilter.map(encyclopedie => 
                
                  <div className="card" onClick={() => handleCardClick(encyclopedie.id)}>
                    <div className="containerAnimal">
                        <img className="AnimalCard" src={require(`../Img/${encyclopedie.lienImg}`)} />
                    </div>
                    <div className="details">
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