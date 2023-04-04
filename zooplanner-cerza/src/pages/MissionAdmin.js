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
                        <select className="inputComboBoxForm" type="select" id="Fonction" name="Fonction" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                            <option value="">Personnel</option>
                            {usersList.map((option) => (
                                <option key={option.value} value={option.value}>
                                {option.nom} {option.prenom}
                                </option>
                            ))}
                        </select>
                        </div> 
                    <div id="headerWidgetMissionText">
                        <select className="inputComboBoxForm" type="select" id="Fonction" name="Fonction" value={selectedEnclos} onChange={(e) => setSelectedEnclos(e.target.value)}>
                            <option value="">n° Enclos</option>
                            {enclosList.map((option) => (
                                <option key={option.value} value={option.value}>
                                {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div id="headerWidgetMissionText">
                        <select className="inputComboBoxForm" type="select" id="Fonction" name="Fonction" value={selectedAnimaux} onChange={(e) => setSelectedAnimaux(e.target.value)}>
                            <option value="">Animal</option>
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
        console.log("Animal : ",selectedAnimaux)
        console.log("Enclos : ",selectedEnclos)
        console.log("User : ",selectedUser)
        const currentDate = new Date()
        const timestamp = currentDate.getTime()
        console.log("date : ", timestamp)
        console.log(document.getElementById("textareaMission").value)
    }


    const mission = () =>{
        return(
            <div className="TableauMissions" id="TableauMissions">
            {displayMissionList.map((mission) => (
                <MissionCardAdmin mission={mission} />
            ))}
            {ajoutMission()}
        </div>
        )
    }

    useEffect(() => {
        getMissions();
        getData();
    }, []);

    return (
        <div>
            <h1>Liste des missions</h1>
            <label for="checkbocMission">Mission terminées</label>
            <input type="checkbox" id="checkbocMission" onChange={console.log("click")} />
            {mission()}
        </div>
    );
};

export default MissionAdmin;