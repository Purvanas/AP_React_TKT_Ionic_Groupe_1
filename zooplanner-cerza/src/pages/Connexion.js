import React, { useState, useEffect  } from 'react';
import axios from "axios";
import CryptoJS from 'crypto-js';

import "../css/style.scss"

const Login = async({add}) => {

  const [userInfo , setUserInfo] = useState({identifiant:"", mdp: ""});

  const handleSubmit = (event) => {
      event.preventDefault();
      //Regex
      const re = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/);
      if (re.test(userInfo.identifiant) && re.test(userInfo.mdp)){
          postAuth();
      }
      else{
          alert("Format incorrect")
      }

  }
  
  const handleChange = (event) => {
      setNouveauResto(event.target.value)
  }


  const postAuth = async () => {
      console.log(response);
      const body = {
          identifiant: userInfo.identifiant,
          mdp: userInfo.mdp
      };      
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const response = await axios.post(api+"users", body, config);
      console.log(response);
      setFormData({
          identifiant: '',
          mdp: ''
      })
    };

  return (
      <div>
          <form action='submit' onSubmit={handleSubmit}>
              <input value={userInfo.identifiant} type="text" placeholder='ajouter resto' onChange={handleChange} />
              <input value={userInfo.mdp} type="text" placeholder='ajouter resto' onChange={handleChange} />
              <button >add</button>
          </form>
      </div>
  );
};

export default Login;