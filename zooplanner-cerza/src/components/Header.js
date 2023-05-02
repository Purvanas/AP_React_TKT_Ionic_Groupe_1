import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import AlertCard from '../components/AlertCard';

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

    const handleSubmit = (event) => {
        event.preventDefault();
        localStorage.clear();
        nav('/');
    }

    useEffect(() => {
        getAlertes();
        getdata();
    }, []);
    
    const verifAdmin = () => {
        if(myObject.Admin === 1){
          return (
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                <a class="nav-link" href='http://localhost:3000/rechercheEncyclopedie'>Encyclopédie</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href='http://localhost:3000/etatAnimaux'>État des animaux</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href='http://localhost:3000/register'>Nouveau compte</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href='http://localhost:3000/MissionAdmin'>Nouvelle mission</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href='http://localhost:3000/AlertesAdmin'>Administration Alertes</a>
                </li>
                
                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img src={LogoAlerte} alt="alertLogo.svg"/></a>
                <div class="dropdown-menu">
                    {alerteList.map((alerte) => (
                        <a class="dropdown-item">
                        <AlertCard alertes={alerte} users={usersList} alerteList={alerteList} setAlerteList={setAlerteList} getAlertes={getAlertes}/>
                        </a>
                    ))}
                </div>
                </li>
            </ul>
          );
        }
        else{
            return(
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                    <a class="nav-link" href='http://localhost:3000/rechercheEncyclopedie'>Encyclopédie</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href='http://localhost:3000/etatAnimaux'>État des animaux</a>
                    </li>
                    <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img src={LogoAlerte} alt="alertLogo.svg"/></a>
                    <div class="dropdown-menu">
                        {alerteList.map((alerte) => (
                            <a class="dropdown-item">
                            <AlertCard alertes={alerte} users={usersList} alerteList={alerteList} setAlerteList={setAlerteList} getAlertes={getAlertes}/>
                            </a>
                        ))}
                    </div>
                    </li>
                </ul>
            );
        }
      }

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="http://localhost:3000/Accueil"><img src={LogoCerza} alt="logoCerza.svg"/></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarColor03">
                    {verifAdmin()}
                    <form class="d-flex" onSubmit={handleSubmit} id="logout">
                        <button class="btn btn-secondary my-2 my-sm-0" type="submit"><img id='logOutBtn' src={LogOut} alt="logoLogout.svg"/></button>
                    </form>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;