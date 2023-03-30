import React, { useState, useEffect  } from 'react';
import axios from "axios";

const MissionAdmin = () => {
    const api = "http://localhost:8080/";

    const [missionList, setMissionList] = useState([]);

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
            idEnclos : mission.idEnclos 
        };
        });
        setMissionList(missionList);
        console.log(missionList)
    }


    const mission = () =>{
        return(
            <div className="TableauMissions" id="TableauMissions">

            {missionList.map((mission) => (
                <div key={mission.id} className="widgetMission">
                    {mission.Description}
                </div>
            ))}
        </div>
        )
    }

    useEffect(() => {
        getMissions();
    }, []);

    return (
        <div>
            <h1>Mission ! (admin)</h1>
            {mission()}
        </div>
    );
};

export default MissionAdmin;