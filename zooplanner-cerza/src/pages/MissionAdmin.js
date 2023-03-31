import React, { useState, useEffect  } from 'react';
import axios from "axios";
import MissionCardAdmin from '../components/MissionCardAdmin';

import "../css/MissionCardAdmin.scss"

const MissionAdmin = () => {
    const api = "http://localhost:8080/";

    const [missionList, setMissionList] = useState([]);
    const [displayMissionList, setDisplayMissionList] = useState([]);

    const getData = async () => {
        const enclos = await axios.get(api+"enclos");
        const animaux = await axios.get(api+"animaux");
        const utilisateurs = await axios.get(api+"users")
        console.log("enclos : ",enclos.data.results)
        console.log("animaux : ",animaux.data.results)
        console.log("utilisateurs : ",utilisateurs.data.results)
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
            <div key={"new"} className="widgetMission">
                <div className='headerWidgetMission'>
                    <div id="headerWidgetMissionText">
                        <select>
                            <option value="">Personnel</option>
                        </select></div> 
                    <div id="headerWidgetMissionText">
                        <select>
                            <option value="">n° Enclos</option>
                        </select>
                    </div>
                    <div>
                        <select>
                            <option value="">Animal</option>
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
        )
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
            <h1>Mission ! (admin)</h1>
            {mission()}
        </div>
    );
};

export default MissionAdmin;