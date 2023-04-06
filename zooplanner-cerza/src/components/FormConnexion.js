import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import CryptoJS from 'crypto-js';

import "../css/Register.scss"
import "../css/style.scss"
//Faire en sorte que cette page ne soit accéssible que par l'admin

const FormConnexion = () => {
    const navigAcc = useNavigate();

    const salt = "hxjafvjwxcvjkwxhkcjvh";
    const api = "http://localhost:8080/";
    const re = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/);

    const [formAuth, setFormAuth] = useState({
        Identifiant:'',
        Password:''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormAuth({ ...formAuth, [name]: value });
    };  


    const handleSubmit = async (event) => {
        event.preventDefault();
        const id = formAuth.Identifiant;
        const password = formAuth.Password;
        if(!password.match(re)){alert("Format de mot de passe incorrect")}
        else {
            const response = await postAuth();
            if (response.data.length != 0){
                localStorage.setItem("currentUser",JSON.parse(JSON.stringify(response.data[0])));
                console.log(localStorage.getItem("currentUser"));
                console.log(localStorage.getItem("currentUser").Admin);
                navigAcc('/Accueil');
            }
            else{
                alert("Identifiant ou mot de passe incorrect")
            }
        }
    }

    function hashPassword(password, salt) {
        var hash = CryptoJS.SHA256(password + salt);
        return hash.toString(CryptoJS.enc.Hex);
    }

    const postAuth = async () => {
        const body = {
          Identifiant: formAuth.Identifiant,
          Password: formAuth.Password
        };      
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const response = (await axios.post(api+"auth", body, config));
        setFormAuth({
            Identifiant:'',
            Password:''
        })
        return response;
      };

    const FormConnexion = () =>{ 
        return(
            <div id="formAuth">
                <h1 id='titreForm'>Connexion</h1>
                <form onSubmit={handleSubmit} id="formAuth">
                    <div className="formDataRow">
                    <input className="inputTextForm" type="text" id="Identifiant" name="Identifiant" value={formAuth.Identifiant} onChange={handleChange} required/></div>

                    <div className="formDataRow">
                    <input className="inputTextForm" type="password" id="Password" name="Password" value={formAuth.Password} onChange={handleChange} required/></div>

                    <button id="sumbitBtn">Connexion</button>
                </form>
            </div>
        )
    }
    
    return (
        <div>
            {FormConnexion()}
        </div>
    );
};

export default FormConnexion;