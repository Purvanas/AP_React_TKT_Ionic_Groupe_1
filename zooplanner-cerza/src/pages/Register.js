import React, { useState, useEffect  } from 'react';
import axios from "axios";
import CryptoJS from 'crypto-js';
import Header from '../components/Header';

import "../css/Register.scss"
import "../css/style.scss"
//Faire en sorte que cette page ne soit accéssible que par l'admin

const Register = () => {
   
    const salt = "hxjafvjwxcvjkwxhkcjvh";
    const api = "http://localhost:8080/";
    const re = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/);

    const [formData, setFormData] = useState({
        Nom: '',
        Prenom: '',
        Telephone:'',
        Identifiant:'',
        Password:''
    });
    const [checked, setChecked] = React.useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [optionsList, setOptionsList] = useState([]);
    

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
        if(selectedOption === null){alert("Vous devez selectionner une fonction")}
        else if(!password.value.match(re)){alert("Le mot de passe doit faire 12 caractère des long, doit contenir des majuscules, des minuscules et des caractères spéciaux")}
        else if(password.value === passwordCheck.value){
            await postUser()
        } else{
            alert("Les mots de passe doivent être identiques")
        }
    }

    
 
    function hashPassword(password, salt) {
        var hash = CryptoJS.SHA256(password + salt);
        return hash.toString(CryptoJS.enc.Hex);
}



const getFonction = async () => {
  try {
    const options = await axios.get(api + "fonctions");
    const fonctions = options.data.results;

    const optionsList = fonctions.map((fonction) => {
      return { value: fonction.id, label: fonction.Libelle };
    });
    setOptionsList(optionsList);
  } catch (error) {
    console.error(error);
  }
};

    const postUser = async () => {
        const body = {
          Nom : formData.Nom,
          Prenom : formData.Prenom,
          Identifiant: formData.Identifiant,
          mdp: await hashPassword(formData.Password,salt),
          idFonction: selectedOption,
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
            Identifiant:'',
            Password:''
        })
        document.getElementById('PasswordCheck').value=""
        document.getElementById('Fonction').selectedIndex = 0
        setSelectedOption(null)
      };


    useEffect(() => {
        getFonction();
    }, []);

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
                    
                    <select className="inputComboBoxForm" type="select" id="Fonction" name="Fonction" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                        <option value="">Sélectionner une fonction</option>
                        {optionsList.map((option) => (
                            <option key={option.value} value={option.value}>
                            {option.label}
                            </option>
                        ))}
                    </select>
                    
                    </div>

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
            <Header/>
            {FormRegister()}
        </div>
    );
};

export default Register;