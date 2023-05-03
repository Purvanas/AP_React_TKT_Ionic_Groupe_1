import React from 'react';

const FormAlert = (props) => {
    var usersList = props.usersList
    var handleSubmit = props.handleSubmit
    var selectedUser = props.selectedUser
    var setSelectedUser = props.setSelectedUser
    var selectedLevel = props.selectedLevel
    var setSelectedLevel = props.setSelectedLevel
    
    return (
        <div>
           <form onSubmit={handleSubmit}>
                <h1 style={{textAlign: 'center'}}>Ajouter une alerte</h1>
                <div id="formAddAlert">
                <p>Utilisateur : </p>
                    <select className="inputComboBoxForm2" type="select" id="Personnel" name="Personnel" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                                    <option value={null}>Personnel</option>
                                    {usersList.map((option) => (
                                        <option key={option.id} value={option.id}>
                                        {option.Nom} {option.Prenom}
                                        </option>
                                    ))}
                    </select>
                <p>niveau de l'alerte :</p> 
                <select className="inputComboBoxForm2" type="select" id="level" name="level" value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
                                    <option value={null}>Niveau</option>
                                    
                                        <option key={1} value={1}>
                                        Evenement pas grave
                                        </option>

                                        <option key={2} value={2}>
                                        Evenement méritant de l'attention
                                        </option>
                                        
                                        <option key={3} value={3}>
                                        Evenement inquiétant
                                        </option>
                                        
                                        <option key={4} value={4}>
                                        Evenement très grave
                                        </option>

                    </select>
                    </div>
                <label> description :
                <div id='bodyWidgetMissionText'><textarea id="textareaMission"/></div></label>
                <br />
                <button type="submit" id="btnMissionWidget">Valider</button>
            </form>
        </div>
    );
};

export default FormAlert;