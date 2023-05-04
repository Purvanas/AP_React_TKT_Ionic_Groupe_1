import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Modal from '../components/Modal';

import AlertCard from '../components/AlertCard';
import FormAlert from './FormAlert';

import '../css/bootstrap.min.css';
import '../css/Header.scss';
import '../css/AlertCard.scss'

import LogoCerza from '../Img/logoCerza.svg';
import LogoAlerte from '../Img/alertLogo.svg';
import LogOut from '../Img/logoLogout.svg';

const Header = () => {
    const myObject = JSON.parse(localStorage.getItem("currentUser"));
    const api = "http://localhost:8080/";

    const [alerteList, setAlerteList] = useState([]);  

    const [usersList, setUsersList] = useState([]); 

    const [selectedUser, setSelectedUser] = useState(null);

    const [selectedLevel, setSelectedLevel] = useState(null);

    const [showModal, setShowModal] = useState(false);

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

    const nav = useNavigate();

    const handleSubmit_Deco = (event) => {
        event.preventDefault();
        localStorage.clear();
        nav('/');
    }

    const handleSubmit_FormAlerte = async (event) => {
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
        getAlertes();
        getdata();
    }, []);
    
    const verifAdmin = () => {
        if(myObject.Admin === 1){
          return (
            <ul className="navbar-nav me-auto">
                <li className="nav-item">
                <a className="nav-link" href='http://localhost:3000/rechercheEncyclopedie'>Encyclopédie</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href='http://localhost:3000/etatAnimaux'>État des animaux</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href='http://localhost:3000/register'>Nouveau compte</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href='http://localhost:3000/MissionAdmin'>Nouvelle mission</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href='http://localhost:3000/AlertesAdmin'>Administration Alertes</a>
                </li>
                
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img src={LogoAlerte} alt="alertLogo.svg"/></a>
                <div className="dropdown-menu">
                    {alerteList.map((alerte) => (
                        <a className="dropdown-item">
                        <AlertCard alertes={alerte} users={usersList} alerteList={alerteList} setAlerteList={setAlerteList} getAlertes={getAlertes}/>
                        </a>
                    ))}
                </div>
                </li>
                <li className="nav-item">
                    <div>
                        <button onClick={handleOpenModal} id='btnAddAlerte'>Ajouter une alerte</button>
                        {showModal && (
                            <Modal content={<FormAlert handleSubmit={handleSubmit_FormAlerte} usersList={usersList} selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} selectedUser={myObject.id} setSelectedUser={setSelectedUser} />} onClose={handleCloseModal}/>
                        )}
                    </div>
                </li>
            </ul>
          );
        }
        else{
            return(
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                    <a className="nav-link" href='http://localhost:3000/rechercheEncyclopedie'>Encyclopédie</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href='http://localhost:3000/etatAnimaux'>État des animaux</a>
                    </li>
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img src={LogoAlerte} alt="alertLogo.svg"/></a>
                    <div className="dropdown-menu">
                        {alerteList.map((alerte) => (
                            <a className="dropdown-item">
                            <AlertCard alertes={alerte} users={usersList} alerteList={alerteList} setAlerteList={setAlerteList} getAlertes={getAlertes}/>
                            </a>
                        ))}
                    </div>
                    </li>
                    <li className="nav-item">
                    <div>
                        <button onClick={handleOpenModal} id='btnAddAlerte'>Ajouter une alerte</button>
                        {showModal && (
                            <Modal content={<FormAlert handleSubmit={handleSubmit_FormAlerte} usersList={usersList} selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />} onClose={handleCloseModal}/>
                        )}
                    </div>
                    </li>
                </ul>
            );
        }
      }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="http://localhost:3000/Accueil"><img src={LogoCerza} alt="logoCerza.svg"/></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor03">
                    {verifAdmin()}
                    <form className="d-flex" onSubmit={handleSubmit_Deco} id="logout">
                        <button className="btn btn-secondary my-2 my-sm-0" type="submit"><img id='logOutBtn' src={LogOut} alt="logoLogout.svg"/></button>
                    </form>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;