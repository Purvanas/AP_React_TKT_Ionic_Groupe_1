import React, { useState, useEffect } from "react";

import axios from 'axios';

const api = "http://localhost:8080/";
let myObject = JSON.parse(localStorage.getItem("currentUser"));
const MissionsCardsUsers = () => {
    const [missions, setMissions] = useState([]);
    console.log(myObject.id);

    useEffect(() => {
      try {     
      const fetchData = async () => {
        const response = await axios.get(api +`UsersMissions?idUtilisateur=${myObject.id}`);
        setMissions(response.data.results);
        console.log(response.data.results);
      };
      fetchData();
    } catch (error) {
      console.error(error);
    }
    }, []);
   
    return (
        <div>

            <ul>
                {missions.map(mission => <li key={mission.id}> <div className='CardMissionsUsersMainDiv'>
                <div className='CardMissionsUsersHeadDiv'>
                    <td className='CardMissionsUsersTdDate'>
        
                        <a>Date : {new Date(mission.DateHeureAttribution).toLocaleString()}</a>                    </td>
                    <td className='CardMissionsUsersTdEnclos'>
                        <a>Enclos : {mission.idEnclos}</a>
                    </td>
                    <td className='CardMissionsUsersTdAnimal'>
                        {mission.idAnimal ? <a>Animal : {mission.Nom}</a> : <a>Pas d'animal assigné</a>}
                    </td>
                </div>
                <div className='CardMissionsUsersBodyDiv'>
                    <p>
                        {mission.Description}
                    </p>
                    <button className='CardMissionsUsersButton'>Terminer</button>
                </div>
                </div></li>)}
        </ul>
    </div>
        
    );

}

export default MissionsCardsUsers;