import React from 'react';


const MissionCardAdmin = (props) => {
    const mission = props.mission

    const formatDateLisible = (uneDate) =>{
        const date = new Date(uneDate)
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }
        return date.toLocaleDateString('fr-FR', options);
    }

    const animalNom = () =>{
        if(!!mission.AnimalNom){return (<div id="headerWidgetMissionText">Animal : <b>{mission.AnimalNom}</b></div>)}
        else{return(<div></div>)}
    }

    const etatMission = () => {
        if(!!mission.DateHeureValidation){return(<div id='WidgetMissionEtat'>Validée le : {formatDateLisible(mission.DateHeureValidation)}</div>)}
        else{return(<div id='WidgetMissionEtat'>Pas encore validée</div>)}
    }

    return (
        <div key={mission.id} className="widgetMission">
            <div className='headerWidgetMission'>
                <div id="headerWidgetMissionText">Personnel : <b>{mission.UserNom} {mission.UserPrenom}</b></div> 
                <div id="headerWidgetMissionText">Enclos <b>n°{mission.idEnclos}</b></div>
                {animalNom()}
                <div id="headerWidgetMissionText">Donnée le : <b>{formatDateLisible(mission.DateHeureAttribution)}</b></div>
            </div>
            <div id='bodyWidgetMissionText'>{mission.Description}</div>
            
            <div id='boutonWidget'>
                <div></div><div></div>
                {/*<button id="btnMissionWidget">Modifier</button>
                <button id="btnMissionWidget">Suprimer</button>*/}
                {etatMission()}
            </div>
        </div>
    );
};

export default MissionCardAdmin;