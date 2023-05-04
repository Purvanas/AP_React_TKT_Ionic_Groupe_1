import React from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/MissionsCardsUsers.scss';
import MissionsCardsUsers from '../components/MissionsCardsUsers';
import MissionList from '../components/MissionList';


//const res = await axios.get(`requete d'api`); /////FONCTION AXIOS.GET/////

/*axios.post('requete d'api', { ///FONCTION AXIO.POST
                    {body}
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });*/

//const res = await axios.put('requete d'api', {body});

//axios.delete('requete d'api/{ID}')




const Accueil = () => {
    return (
        <div>
          <div id="backGround">
          <Header/>
          <div className='MissionsUsersMainDiv'>
            <MissionsCardsUsers/>
          </div>
          </div>
        </div>
    );
};

export default Accueil;