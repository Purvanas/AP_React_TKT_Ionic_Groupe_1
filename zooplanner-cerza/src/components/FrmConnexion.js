import React, { useState, useEffect  } from 'react';
import axios from "axios";
import CryptoJS from 'crypto-js';

import "../css/style.scss"
import { use } from 'bcrypt/promises';

const salt = "hxjafvjwxcvjkwxhkcjvh";
const api = "http://localhost:8080/";

const FrmConnexion = () => {

  const [userInfo , setUserInfo] = useState({identifiant:"", mdp: ""});

  const handleSubmit = (event) => {
      event.preventDefault();
      //Regex
      const re = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/);
      console.log(userInfo.mdp);
      if (re.test(userInfo.mdp)){
        postAuth();
      }
      else{
        alert("Format incorrect")
      }

  }
  
  const handleChange = async(event) => {
      await setUserInfo({...userInfo, [event.target.name]: event.target.value});
      console.log(userInfo);
  }


  const postAuth = async () => {
      const body = {
          identifiant: userInfo.identifiant,
          mdp: userInfo.mdp
      };      
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const response = axios.post(api+"auth", body, config);
      console.log(response);
      setUserInfo({
          identifiant: '',
          mdp: ''
      })
    };

  return (
      <div>
          <form action='submit' onSubmit={handleSubmit}>
              <input name="identifiant" value={userInfo.identifiant} type="text" placeholder='Identifiant' onChange={handleChange} />
              <input name="mdp" value={userInfo.mdp} type="password" placeholder='Mot de passe' onChange={handleChange} />
              <button >Connexion</button>
          </form>
      </div>
  );
};

export default FrmConnexion;