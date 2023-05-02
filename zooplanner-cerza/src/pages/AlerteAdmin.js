import React, { useState, useEffect  } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AlertCard from '../components/AlertCard';
import Modal from '../components/Modal';

import '../css/MissionCardAdmin.scss'
import '../css/AlertCard.scss'

const AlerteAdmin = () => {

  const myObject = JSON.parse(localStorage.getItem("currentUser"));
  const navigAcc = useNavigate();

    const api = "http://localhost:8080/";
    document.title = "ZooPlanner Alertes";

    const [alerteList, setAlerteList] = useState([]);  

    const [selectedUser, setSelectedUser] = useState(null);
    const [usersList, setUsersList] = useState([]);

    const [selectedLevel, setSelectedLevel] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const verifAdmin = () => {
      if(myObject.Admin === 1){
        getAlertes();
        getdata();
      }
      else{
        navigAcc('/Accueil');
      }
    }

    const getAlertes = async () => {
      const alert = await axios.get(api + "alertes");
      setAlerteList(alert.data.results.sort((a, b) => b.Niveau - a.Niveau));
      console.log("plop")
    }

    const getdata = async () =>{
      const utilisateurs = await axios.get(api+"users")
      setUsersList(utilisateurs.data.results)
      console.log(usersList)
    }

    const alertes = () => {
        return (
          <div className="TableauAlertes" id="TableauAlertes">
            {alerteList.map((alerte) => (
              <AlertCard alertes={alerte} users={usersList} alerteList={alerteList} setAlerteList={setAlerteList} getAlertes={getAlertes}/>
            ))}
          </div>
        );
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      const currentDate = new Date()
      

      const body = {
        Description: document.getElementById("textareaMission").value,
        Niveau: selectedLevel,
        DateHeure: currentDate.toISOString().slice(0, 19).replace('T', ' ') ,
        idUtilisateur: selectedUser
      }
      await axios.post(api+"alertes", body);
      console.log(body)
      handleCloseModal();
      getAlertes();
    }

    const handleOpenModal = () => {
      setShowModal(true);
      document.getElementById("backGround").className = "modal-overlay"
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
      document.getElementById("backGround").className = ""
    };
  
    const form = (
      <form onSubmit={handleSubmit}>
        <h1 style={{textAlign: 'center'}}>Ajouter une alerte</h1>
          <div id="formAddAlert">
          <p>Utilisateur : </p>
            <select className="inputComboBoxForm2" type="select" id="Personnel" name="Personnel" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                            <option value={null}>Personnel</option>
                            {usersList.map((option) => (
                                <option key={option.id} value={option.id}>
                                {option.Nom} {option.Prenom}
                                </option>
                            ))}
            </select>
          <p>niveau de l'alerte :</p> 
          <select className="inputComboBoxForm2" type="select" id="level" name="level" value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
                            <option value={null}>Niveau</option>
                            
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
        <div id='bodyWidgetMissionText'><textarea id="textareaMission"/></div></label>
        <br />
        <button type="submit" id="btnMissionWidget">Valider</button>
      </form>
    );

    
    useEffect(() => {
        verifAdmin();
    }, []);

    return (
      <div>
        <Header/>
        <div id="backGround">
            <h1><b>ALERTES !!!!!!!!!!</b></h1>
            <div>
              <button onClick={handleOpenModal} id='btnAddAlerte'>Ajouter une alerte</button>
              {showModal && (
                <Modal content={form} onClose={handleCloseModal}/>
              )}
           </div>            
            {alertes()}
        </div>
      </div>
        
    );
};

export default AlerteAdmin;