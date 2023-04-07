import React from 'react';
import '../css/AlertCard.scss'

const AlertCard = (props) => {
    const alertes = props.alertes

    const date = new Date(alertes.DateHeure);

    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const formattedMinutes = String(minutes).padStart(2, '0');

    const heure = hours + "h" + formattedMinutes

    const couleurAlerte = {
        1: "pastille green",
        2: "pastille yellow",
        3: "pastille orange",
        4: "pastille red"
    };

    return (
        <div key={alertes.id} className={`widgetAlertes ${couleurAlerte[alertes.Niveau]}`}>
            <div className='widgetAlertesHeader'>
                <div>{alertes.idUtilisateur}</div>
                <div className={couleurAlerte[alertes.Niveau]}></div>
            </div>
            <div className='widgetAlertesBody'>{alertes.Description}</div>
            <div className='widgetAlertesBody'><b>Émise à {heure}</b></div>
            
        </div>
    );
};

export default AlertCard;