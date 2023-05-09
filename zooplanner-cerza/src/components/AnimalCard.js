import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../css/style.scss';
import '../css/AnimalCard.scss';
import { lib } from "crypto-js";
 
const api = "http://localhost:8080/";
 
const AnimalCard = () => {
  const [animaux, setAnimaux] = useState([]);
  const [animmauxFilter, setAnimauxFilter] = useState([]);

  const [selectedEtat, setSelectedEtat] = useState('');
  const [selectedAnimal, setSelectedAnimal] = useState('');

  const getAnimaux = (() => {
    try {     
        const fetchData = async () => {
          const response = await axios.get(api +`animaux`);
          setAnimaux(response.data.results);
          setAnimauxFilter(response.data.results);
          console.log(response.data.results);
        };
        fetchData();
      } catch (error) {
        console.error(error);
      }
  })

  useEffect(() => {
    getAnimaux()
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    setAnimauxFilter(animaux.filter(unAnimal => unAnimal.Nom.toLowerCase().includes(event.target.value.toLowerCase())));
};

const LibelleEtat = (EtatAnimal) => {
  let libelle;
  switch (EtatAnimal){
    case 1:
        libelle = "Etat critique / Très inquiétant";
        break;
    case 2:
        libelle = "Mauvais état";
        break;
    case 3:
        libelle = "Fatigué / Malade (faible inquiétude)";
        break;
    case 4:
        libelle = "En bonne forme";
        break;
    case 5:
        libelle = "RAS / Energique"
  }
  return (
    <h3>{libelle}</h3>
  )
}


const handleSubmit = async (event) => {
  console.log("plopplop");
  event.preventDefault();
  const body = {
    Etat: selectedEtat,
    id: selectedAnimal.toString()
  }
  console.log("BODY : ",body)
  console.log("API : ",api+"Etat/"+animaux.id)
  await axios.put(api+"Etat", body);
  // les axios.put et .pacth ne fonctionnent pas///////////////////////////////////////////////////////////

  getAnimaux();
  }

  const modifEtat = (id, NewEtat) => {
    animaux[id].Etat = NewEtat;
    setSelectedAnimal(animaux[id].id);
    setSelectedEtat(animaux[id].Etat);
  }

    return (
      <div className="AnimalDiv">
        <div className="searchDiv">
            <input type={Text} onChange={handleChange} placeholder="Recherche..."></input>
        </div>
        <div className="cards">
              {animmauxFilter.map((animal, idx) => 
                  <div id={{idx}} className="card">
                    <div className="containerAnimal">
                        <img id={idx} className="AnimalCard" src={require(`../Img/animaux/${animal.lienImg}`)} />
                    </div>
                    <div className="details">
                        <h3>Nom : {animal.Nom}</h3>
                        <p>Enclos : {animal.idEnclos}</p>
                        <p>Sexe : {animal.Sexe}</p>
                        <p>Age : {animal.Age}</p>
                        <p>Poidss : {animal.Poids}</p>
                        <p>Taille : {animal.Taille}</p>
                        {LibelleEtat(animal.Etat)}
                    </div>
                    <form className="formEtatAnimal" onSubmit={(e) => {handleSubmit(e)}}>
                        <select className="inputComboBox" type="select" onChange={(e) => modifEtat(idx, parseInt(e.target.value))}>
                            <option value={null}>Modifier l'état</option>
                            <option value={5}>RAS / Energique</option>
                            <option value={4}>En bonne forme</option>
                            <option value={3}>Fatigué / Malade (faible inquiétude)</option>
                            <option value={2}>Mauvais état</option>
                            <option value={1}>Etat critique / Très inquiétant</option>
                        </select>
                        <br />
                        <button type="submit">Valider</button>
                    </form>
                  </div>
              )}
        </div>
      </div>  
    );
 
}
 
export default AnimalCard;