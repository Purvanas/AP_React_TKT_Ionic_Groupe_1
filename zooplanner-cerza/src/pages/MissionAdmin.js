import React, { useState, useEffect  } from 'react';
import axios from "axios";
import MissionCardAdmin from '../components/MissionCardAdmin';

import "../css/MissionCardAdmin.scss"

const MissionAdmin = () => {
    const api = "http://localhost:8080/";

    const [missionList, setMissionList] = useState([]);
    const [displayMissionList, setDisplayMissionList] = useState([]);

    const [selectedEnclos, setSelectedEnclos] = useState(null);
    const [enclosList, setEnclosList] = useState([]);

    const [selectedAnimaux, setSelectedAnimaux] = useState(null);
    const [animauxList, setAnimauxList] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null);
    const [usersList, setUsersList] = useState([]);

    const [showValidatedMissions, setShowValidatedMissions] = useState(false);



    const switchMission = () => {
        const filteredMissions = missionList.filter((mission) => {
          if (showValidatedMissions) {
            return mission.DateHeureValidation !== null;
          } else {
            return mission.DateHeureValidation === null;
          }
        });
        setDisplayMissionList(filteredMissions);
        setShowValidatedMissions(!showValidatedMissions);
    };

    const getData = async () => {
        const enclos = await axios.get(api+"enclos");
        const animaux = await axios.get(api+"animaux");
        const utilisateurs = await axios.get(api+"users")

        const enclosList = enclos.data.results.map((fonction) => {
            return { value: fonction.id, label: fonction.id };
        });
        setEnclosList(enclosList);

        const animauxList = animaux.data.results.map((fonction) => {
            return { value: fonction.id, nom: fonction.Nom, enclos: fonction.idEnclos };
        });
        setAnimauxList(animauxList);
        
        const ursersList = utilisateurs.data.results.map((fonction) => {
            return { value: fonction.id, nom: fonction.Nom, prenom: fonction.Prenom };
        });
        setUsersList(ursersList);
    }

    const getMissions = async () => {
        const mission = await axios.get(api+"admin/missions")
        const dataMission = mission.data.results;

        const missionList = dataMission.map((mission) => {
        return { 
            id: mission.id, 
            Description: mission.Description ,
            UserNom : mission.nomUser,
            UserPrenom : mission.prenomUser,
            idUser : mission.idUtilisateur,
            AnimalNom : mission.nomAnimal,
            idAnimal : mission.idAnimal,
            idEnclos : mission.idEnclos, 
            DateHeureValidation : mission.DateHeureValidation, 
            DateHeureAttribution : mission.DateHeureAttribution
        };
        });
        setMissionList(missionList);
        setDisplayMissionList(missionList)
    }

    const ajoutMission = () => {
        return(
            <form onSubmit={handleSubmit}>
            <div key={"new"} className="widgetMission">
                <div className='headerWidgetMission'>
                    <div id="headerWidgetMissionText">     
                        <select className="inputComboBoxForm" type="select" id="Personnel" name="Personnel" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                            <option value={null}>Personnel</option>
                            {usersList.map((option) => (
                                <option key={option.value} value={option.value}>
                                {option.nom} {option.prenom}
                                </option>
                            ))}
                        </select>
                        </div> 
                    <div id="headerWidgetMissionText">
                        <select className="inputComboBoxForm" type="select" id="Enclos" name="Enclos" value={selectedEnclos} onChange={(e) => setSelectedEnclos(e.target.value)}>
                            <option value={null}>n° Enclos</option>
                            {enclosList.map((option) => (
                                <option key={option.value} value={option.value}>
                                {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div id="headerWidgetMissionText">
                        <select className="inputComboBoxForm" type="select" id="Animal" name="Animal" value={selectedAnimaux} onChange={(e) => setSelectedAnimaux(e.target.value)}>
                            <option value={null}>Animal</option>
                            {animauxList.map((option) => (
                                <option key={option.value} value={option.value}>
                                {option.nom}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div id="headerWidgetMissionText"></div>
                </div>
                <div id='bodyWidgetMissionText'><textarea id="textareaMission"/></div>
                
                <div id='boutonWidget'>
                    <div></div><div></div>
                    <button id="btnMissionWidget">Créer</button>
                </div>
            </div>
            </form>
        )
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const currentDate = new Date()

        const body = {
            idEnclos : selectedEnclos,
            idAnimal : selectedAnimaux,
            idUtilisateur: selectedUser,
            Description: document.getElementById("textareaMission").value,
            DateHeureAttribution: currentDate.toISOString().slice(0, 19).replace('T', ' ')
          };      
          const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
        await axios.post(api+"missions", body, config);
        setSelectedAnimaux(null);
        document.getElementById('Personnel').selectedIndex = 0
        setSelectedEnclos(null);
        document.getElementById('Animal').selectedIndex = 0
        setSelectedUser(null);
        document.getElementById('Enclos').selectedIndex = 0

        document.getElementById("textareaMission").value = "";
        getMissions();
    }


    const mission = () => {
        return (
          <div className="TableauMissions" id="TableauMissions">
            {displayMissionList.map((mission) => (
              <MissionCardAdmin mission={mission} />
            ))}
            {ajoutMission()}
          </div>
        );
    };

    useEffect(() => {
        getMissions();
        getData();
    }, []);

    return (
        <div>
          <h1>Liste des missions</h1>
          <button onClick={switchMission} id="btnMissionWidget" className='btnMissionWidget'>
            {showValidatedMissions ?  "Voir missions validées" : "Voir missions en attente" }
          </button>
          {mission()}
        </div>
    );
};

export default MissionAdmin;