import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/bootstrap.min.css';
import LogoCerza from '../Img/logoCerza.svg';
import LogoAlerte from '../Img/alertLogo.svg';

const Header = () => {
    const nav = useNavigate();
    
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="http://localhost:3000/Accueil"><img src={LogoCerza} alt="logoCerza.svg"/></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarColor03">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                        <a class="nav-link" href='http://localhost:3000/rechercheEncyclopedie'>Encyclopédie</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href='http://localhost:3000/etatAnimaux'>État des animaux</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href='http://localhost:3000/Register'>Nouveau compte</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href='http://localhost:3000/newMission'>Nouvelle mission</a>
                        </li>
                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"><img src={LogoAlerte} alt="alertLogo.svg"/></a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Separated link</a>
                        </div>
                        </li>
                    </ul>
                    <form class="d-flex">
                    
                    </form>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;