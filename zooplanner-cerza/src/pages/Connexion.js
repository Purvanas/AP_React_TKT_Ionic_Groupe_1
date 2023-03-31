import React, { useState, useEffect  } from 'react';
import axios from "axios";
import CryptoJS from 'crypto-js';

import FrmConnexion from '../components/FrmConnexion.js';

import "../css/style.scss"

const Login = () => {
    return (
        <div>
            <h1>Connexion</h1>
            <FrmConnexion/>
        </div>
    )

};

export default Login;