import React, { useState } from 'react';
import axios from "axios";
import CryptoJS from 'crypto-js';

import "../css/Register.scss"
import "../css/style.scss"
//Faire en sorte que cette page ne soit accéssible que par l'admin

const Register = () => {
   
    const salt = "hxjafvjwxcvjkwxhkcjvh";
    const api = "http://localhost:8080/";

    const [formData, setFormData] = useState({
        Nom: '',
        Prenom: '',
        Telephone:'',
        Fonction:'1',
        Identifiant:'',
        Password:'',
    });
    const [checked, setChecked] = React.useState(false);

    const handleCheck = () => {
        setChecked(!checked);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };  


    const handleSubmit = async (event) => {
        event.preventDefault();
        const password = document.getElementById("Password")
        const passwordCheck = document.getElementById("PasswordCheck")
        if(password.value === passwordCheck.value){
            console.log('formData : ',formData)
            console.log("admin : ", checked)
            console.log(await postUser())
            
        } else{
            alert("Les mots de passe doivent être identiques")
        }

    }

    
 
    function hashPassword(password, salt) {
        var hash = CryptoJS.SHA256(password + salt);
        return hash.toString(CryptoJS.enc.Hex);
}

const getFonction = async () => {
    let options = await axios.get(api+"fonctions")
    const fonctions = options.data.results
    console.log("fonctions : ", fonctions)
  
    let optionsList = ""
    for (let i = 0; i < fonctions.length; i++) {
      optionsList += <option>${fonctions[i].Libelle}</option>
    }
  
    return optionsList
}

    const postUser = async () => {
        const body = {
          Nom : formData.Nom,
          Prenom : formData.Prenom,
          Identifiant: formData.Identifiant,
          mdp: await hashPassword(formData.Password,salt),
          idFonction: formData.Fonction,
          NumTel:formData.Telephone,
          Admin:checked
        };      
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const response = await axios.post(api+"users", body, config);
        console.log(response);
        setFormData({
            Nom: '',
            Prenom: '',
            Telephone:'',
            Fonction:'1',
            Identifiant:'',
            Password:''
        })
        document.getElementById('PasswordCheck').value=""
      };


    
    const FormRegister = () =>{ //
        return(
            <div id="registerForm">
                <h1 id='titreForm'>Créer un compte</h1>
                <form onSubmit={handleSubmit} id="formRegister" >
                    <div className="formDataRow"><label htmlFor="Nom">Nom :</label>
                    <input className="inputTextForm" type="text" id="Nom" name="Nom" value={formData.Nom} onChange={handleChange} required/></div>

                    <div className="formDataRow"><label htmlFor="Prenom">Prénom :</label>
                    <input className="inputTextForm" type="text" id="Prenom" name="Prenom" value={formData.Prenom} onChange={handleChange} required/></div>

                    <div className="formDataRow"><label htmlFor="Telephone">Téléphone :</label>
                    <input className="inputTextForm" type="text" id="Telephone" name="Telephone" value={formData.Telephone} onChange={handleChange} required/></div>

                    <div className="formDataRow"><label htmlFor="Fonction">Fonction :</label>
                    
                    <select className="inputComboBoxForm" type="select" id="Fonction" name="Fonction" value={formData.Fonction} onChange={handleChange}>
                        {getFonction()}
                    </select></div>

                    <div className="formDataRow"><label htmlFor="Identifiant">Identifiant :</label>
                    <input className="inputTextForm" type="text" id="Identifiant" name="Identifiant" value={formData.Identifiant} onChange={handleChange} required/></div>

                    <div className="formDataRow"><label htmlFor="Password">Mot de passe :</label>
                    <input className="inputTextForm" type="password" id="Password" name="Password" value={formData.Password} onChange={handleChange} required/></div>

                    <div className="formDataRow"><label htmlFor="PasswordCheck">Retapez le mot de passe :</label>
                    <input className="inputTextForm" type="password" id="PasswordCheck" name="PasswordCheck"  onChange={handleChange} required/></div>

                    <div className="formDataRow"><label htmlFor="Admin">Admin :</label>
                    <input className="inputCheckBoxForm" type="checkBox" id="Admin" name="Admin" value={formData.Admin} onChange={handleCheck} /></div>

                    <button id="sumbitBtn">Créer le compte</button>
                </form>
            </div>
        )
    }
    
    return (
        <div>
            {FormRegister()}
        </div>
    );
};

export default Register;