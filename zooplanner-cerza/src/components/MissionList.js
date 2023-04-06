import React, { useState, useEffect } from "react";

import axios from 'axios';

const api = "http://localhost:8080/";

const MissionList = () => {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    try {     
    const fetchData = async () => {
      const response = await axios.get(api + "UsersMissions");
      setMissions(response.data.results);
    };
    fetchData();
  } catch (error) {
    console.error(error);
  }
  }, []);

  return (
    <ul>
      
    </ul>
  );
};

export default MissionList;
//{missions.map(mission => <li key={mission.id}>{mission.Description}</li>)}