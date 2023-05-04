import React, { useState, useEffect  } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AlertCard from '../components/AlertCard';
import Modal from '../components/Modal';
 
import '../css/MissionCardAdmin.scss'
import '../css/AlertCard.scss'
import FormAlert from '../components/FormAlert';
 
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
    
    useEffect(() => {
        verifAdmin();
    }, []);
 
    return (
      <div>
        <div id="backGround">
            <Header/>
            <h1><b>ALERTES !!!!!!!!!!</b></h1>
            <div>
              <button onClick={handleOpenModal} id='btnAddAlerte'>Ajouter une alerte</button>
              {showModal && (
                <Modal content={<FormAlert handleSubmit={handleSubmit} usersList={usersList} selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />} onClose={handleCloseModal}/>
              )}
           </div>            
            {alertes()}
        </div>
      </div>
        
    );
};
 
export default AlerteAdmin;