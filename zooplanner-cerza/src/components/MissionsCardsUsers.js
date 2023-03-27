import React, { useState } from "react";


const MissionsCardsUsers = () => {
    

    return (
        <div className='CardMissionsUsersMainDiv'>
            <div className='CardMissionsUsersHeadDiv'>
                <td className='CardMissionsUsersTdDate'>
                    <a>Date : 16/07/1995</a>
                </td>
                <td className='CardMissionsUsersTdEnclos'>
                    <a>Enclos : 6</a>
                </td>
                <td className='CardMissionsUsersTdEcspeces'>
                    <a>Ecspèces : Suricate</a>
                </td>
                <td className='CardMissionsUsersTdAnimal'>
                    <a>Animal : Robert</a>
                </td>
            </div>
            <div className='CardMissionsUsersBodyDiv'>
                <p>
                    o eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti 
                    atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, 
                    similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum 
                    quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi
                </p>
                <button className='CardMissionsUsersButton'>Terminer</button>
            </div>
        </div>
    );

}

export default MissionsCardsUsers;