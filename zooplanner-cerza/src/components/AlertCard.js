import React, { useState, useEffect  } from 'react';
import axios from "axios";
import '../css/AlertCard.scss'
import Modal from '../components/Modal';

const AlertCard = (props) => {

  const myObject = JSON.parse(localStorage.getItem("currentUser"));

    const api = "http://localhost:8080/";
    const alertes = props.alertes
    const users = props.users
    const setAlerteList = props.setAlerteList
    const alerteList = props.alerteList
    
    const utilisateurs = users.find(user => user.id === alertes.idUtilisateur)
    const utilisateur = utilisateurs ? utilisateurs.Nom + " " + utilisateurs.Prenom : "Utilisateur inconnu";

    const [showModal, setShowModal] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState(null);

    const handleOpenModal = () => {
        setShowModal(true);
        document.getElementById("backGround").className = "modal-overlay"
      };
    
      const handleCloseModal = () => {
        setShowModal(false);
        document.getElementById("backGround").className = ""
      };
    
    const getAlertes = props.getAlertes;
    const date = new Date(alertes.DateHeure);

    const heures = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const formattedMinutes = String(minutes).padStart(2, '0');

    const heure = heures + "h" + formattedMinutes

    const couleurAlerte = {
        1: "pastille green",
        2: "pastille yellow",
        3: "pastille orange",
        4: "pastille red"
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const currentDate = new Date()
        
  
        const body = {
          Description: document.getElementById("textareaMission").value,
          Niveau: selectedLevel,
          DateHeure: currentDate.toISOString().slice(0, 19).replace('T', ' ') ,
          idUtilisateur: alertes.idUtilisateur.toString()
        }
        console.log("BODY : ",body)
        console.log("API : ",api+"alertes/"+alertes.id)
        await axios.post(api+"alertes", body);
        // les axios.put et .pacth ne fonctionnent pas///////////////////////////////////////////////////////////
        await axios.delete(api + 'alertes/'+alertes.id)

        handleCloseModal();
        getAlertes();
      }

    const deleteAlerte = () => { 
        axios.delete(api + 'alertes/'+alertes.id)
        console.log(api + 'alertes/'+alertes.id)
        const newlist = alerteList.filter(objet => objet.id !== alertes.id);
        setAlerteList(newlist)
      }

      const form = (
        <form onSubmit={handleSubmit}>
          <h1 style={{textAlign: 'center'}}>Modifier une alerte</h1>
            <div id="formAddAlert">
            <p><b>{utilisateur}</b></p><div></div>
              
            <p>niveau de l'alerte :</p> 
            <select className="inputComboBoxForm2" type="select" id="level" name="level" defaultValue={alertes.Niveau} value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
                                <option value={alertes.Niveau}>{alertes.Niveau === 1 ? "Evenement pas grave" : alertes.Niveau === 2 ? "Evenement méritant de l'attention" : alertes.Niveau === 3 ? "Evenement inquiétant" : alertes.Niveau === 4 ? "Evenement très grave" : null}</option>
                              
                                  <option key={1} value={1}>
                                  Evenement pas grave
                                  </option>
  
                                  <option key={2} value={2}>
                                  Evenement méritant de l'attention
                                  </option>
                                  
                                  <option key={3} value={3}>
                                  Evenement inquiétant
                                  </option>
                                  
                                  <option key={4} value={4}>
                                  Evenement très grave
                                  </option>
  
              </select>
              </div>
          <label> description :
          <div id='bodyWidgetMissionText'><textarea id="textareaMission">{alertes.Description}</textarea></div></label>
          <br />
          <button type="submit" id="btnMissionWidget">Valider</button>
        </form>
      );  

      const verifAdmin = () => {
        if(myObject.Admin === 1){
          return (<div className='alerteBtn'>
          {showModal && (
              <Modal content={form} onClose={handleCloseModal}/>
            )}
          <button onClick={handleOpenModal} className='btnAlerte'>Modifier</button>
            {showModal && (
              <Modal content={form} onClose={handleCloseModal}/>
            )}

          <button className='btnAlerte' onClick={deleteAlerte}>Supprimer</button>
          </div>);
        }
      }

    return (
        <div key={alertes.id} className={`widgetAlertes ${couleurAlerte[alertes.Niveau]}`}>
            <div className='widgetAlertesHeader'>
                <div>{utilisateur}</div>
                <div className={couleurAlerte[alertes.Niveau]}></div>
            </div>
            <div className='widgetAlertesBody'>{alertes.Description}</div>
            <div className='widgetAlertesBody'><b>Émise à {heure}</b></div>
            {verifAdmin()}
        </div>
    );
};

export default AlertCard;
