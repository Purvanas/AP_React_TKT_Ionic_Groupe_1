import React, { useState, useEffect  } from 'react';
import axios from "axios";
import AlertCard from '../components/AlertCard';

const AlerteAdmin = () => {
    const api = "http://localhost:8080/";

    const [alerteList, setAlerteList] = useState([]);  

    const getAlertes = async () => {
        const alert = await axios.get(api + "alertes");
        setAlerteList(alert.data.results);
    }

    const alertes = () => {
        return (
          <div className="TableauAlertes" id="TableauAlertes">
            {alerteList.map((alerte) => (
              <AlertCard alertes={alerte} />
            ))}
          </div>
        );
    };


    useEffect(() => {
        getAlertes();
    }, []);

    return (
        <div>
            <h1><b>ALERTES !!!!!!!!!!</b></h1>
            {alertes()}
        </div>
    );
};

export default AlerteAdmin;