const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const config = require('./bdd.js');

app.use(cors())
app.use(express.json());
app.use(cors());
app.use(
    express.urlencoded({
        extended:true,
    })
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });

//REOUTES GET ⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇
app.get("/users", (req, res) => {
    let sql = "SELECT id,Nom,Prenom FROM utilisateur";
    config.query(sql,(err, results) =>{
        if(err) throw err
        console.log(results);
        res.json({results});
    })
});

app.get("/fonctions", (req, res) => {
    let sql = "SELECT id,Libelle FROM fonction";
    config.query(sql,(err, results) =>{
        if(err) throw err
        console.log(results);
        res.json({results});
    })
});

app.get("/", (req, res) => {
    res.json({ message: "ok" });
});

app.get("/animaux", (req, res) => {
    let sql = "SELECT id, idEnclos, Nom, Age, Poids, Taille, Etat, lienImg FROM animal";
    config.query(sql,(err, results) =>{
        if(err) throw err
        console.log(results);
        res.json({results});
    })
});

app.put("/Etat", (req, res) => {
    const data = {
        Etat : req.body.Etat,
        id : req.body.id,
    }
    let sql = "Update animal set Etat = ? where id = ?";
    config.query(sql, Object.values(data), (err, results) =>{
        if(err) throw err;
        console.log(results);
        res.json({results});
    })
});


userAuth = (identifiant, mdp) => {
    return new Promise((resolve, reject) => {
      config.query(
        "SELECT id, Nom, Prenom, NumTel, idFonction, Admin FROM utilisateur WHERE identifiant = '"+identifiant+"' and mdp = '"+mdp+"'",
        (error, utilisateur) => {
          if (error) {
            return reject(error);
          }
          //une petite manipulation de donnée pour éviter des soucis de format par la suite.
          return resolve(utilisateur);
        }
      );
    });
  };
  
   
  
  app.post("/auth", (req, res) => {
    console.log("connection");
    const data = {
      identifiant: req.body.Identifiant,
      mdp: req.body.Password,
    };

    userAuth(data.identifiant, data.mdp)
      .then((response) => {
        res.send(response);
      })

      .catch((error) => {
        console.log(error);
        res.status(500).send("Erreur serveur");
      });
  });


app.get("/enclos", (req, res) => {
    let sql = "SELECT id FROM enclos";
    config.query(sql,(err, results) =>{
        if(err) throw err
        console.log(results);
        res.json({results});
    })
});

app.get("/alertes", (req, res) => {
    let sql= "SELECT id, Description, Niveau, DateHeure, idUtilisateur FROM alerte";
    config.query(sql,(err, results) =>{
        if(err) throw err
        console.log(results);
        res.json({results});
    })
});

app.get("/admin/missions", (req, res) => {let sql = "SELECT mission.id, mission.idEnclos, mission.idAnimal, animal.Nom as nomAnimal, idUtilisateur, utilisateur.Nom as nomUser, utilisateur.Prenom as prenomUser, Description, DateHeureValidation, DateHeureAttribution FROM mission left join animal on animal.id = idAnimal inner join utilisateur on idUtilisateur = utilisateur.id";
    config.query(sql,(err, results) =>{
        if(err) throw err
        console.log(results);
        res.json({results});
    })
});


//REOUTES POST ⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇




app.get("/EncyclopedieFiche/:idEspece", (req, res) => {
    const idEspece = req.params.idEspece;
    let sql = "SELECT DISTINCT espece.id, espece.Libelle as Libelle, espece.tailleMin, espece.tailleMax, espece.poidsMin, espece.poidsMax, espece.dureeGestationJours, espece.duréeVie, espece.Description, espece.lienImg, idEnclos, regime.Libelle as Regime FROM `espece` INNER join animal on espece.id = idEspece INNER JOIN regime on idRegime = regime.id WHERE espece.id ="+ idEspece +";";
    config.query(sql, [idEspece],(err, results) =>{
        if(err) throw err
        console.log(results);
        res.json({results});
    })
});

app.get("/EncyclopedieCard", (req, res) => {
    
    let sql = "SELECT DISTINCT espece.id, espece.Libelle, idEnclos, espece.lienImg FROM `espece` INNER join animal on espece.id = idEspece ;  ";
    config.query(sql,(err, results) =>{
        if(err) throw err
        console.log(results);
        res.json({results});
    })
});

app.get("/UsersMissions", (req, res) => {
    const idUtilisateur = req.query.idUtilisateur; // récupérer la valeur de idUtilisateur à partir des paramètres de requête
    let sql = "SELECT mission.id, mission.idEnclos, idAnimal, Nom, Description, DateHeureAttribution, DateHeureValidation FROM mission LEFT JOIN animal on animal.id=idAnimal WHERE mission.idUtilisateur=?; ";
    config.query(sql,[idUtilisateur],(err, results) =>{
        if(err) throw err
        console.log(results);
        res.json({results});
    })
});

app.post('/users', (req,res) => {    
    console.log("Body : ",req.body)
    const data = {
        Nom : req.body.Nom,
        Prenom : req.body.Prenom,
        Identifiant: req.body.Identifiant,
        mdp: req.body.mdp,
        idFonction: req.body.idFonction,
        NumTel: req.body.NumTel,
        Admin:req.body.Admin
    }
    let sql = 'INSERT INTO utilisateur(Nom,Prenom,Identifiant,mdp,idFonction,NumTel,Admin) VALUES (?,?,?,?,?,?,?)';
    config.query(sql, Object.values(data), (err) =>{
        if(err){
            console.log(data);
            res.json({message : "fail", Error : err});
        }else{
            res.json({message : "nice", Data : data});
        }
    })
})

app.post('/missions', (req,res) => {    
    console.log("Body : ",req.body)
    const data = {
        idEnclos : req.body.idEnclos,
        idAnimal : req.body.idAnimal,
        idUtilisateur: req.body.idUtilisateur,
        Description: req.body.Description,
        DateHeureAttribution: req.body.DateHeureAttribution
    }
    let sql = "INSERT INTO `mission` (`idEnclos`, `idAnimal`, `idUtilisateur`, `Description`, `DateHeureAttribution`) VALUES (?,?,?,?,?); ";
    config.query(sql, Object.values(data), (err) =>{
        if(err){
            console.log(data);
            res.json({message : "fail", Error : err});
        }else{
            res.json({message : "nice", Data : data});
        }
    })
})

app.post('/alertes', (req,res) => {    
    console.log("Body : ",req.body)
    const data = {
        Description : req.body.Description,
        Niveau : req.body.Niveau,
        DateHeure: req.body.DateHeure,
        idUtilisateur: req.body.idUtilisateur
    }
    let sql = "INSERT INTO `alerte` (`Description`, `Niveau`, `DateHeure`, `idUtilisateur`) VALUES (?,?,?,?); ";
    config.query(sql, Object.values(data), (err) =>{
        if(err){
            console.log(data);
            res.json({message : "fail", Error : err});
        }else{
            res.json({message : "nice", Data : data});
        }
    })
})

app.put('/missionDateValid/:id', (req,res) => {    
    console.log("Body : ",req.body)
    const data = {
        DateHeureValidation : req.body.DateHeureValidation,

    }
    let sql = "UPDATE `mission` SET `DateHeureValidation` = ? WHERE `id` = ?;";
    config.query(sql, [...Object.values(data), req.params.id], (err) =>{
        if(err){
            console.log(data);
            res.json({message : "fail", Error : err});
        }else{
            res.json({message : "nice", Data : data});
        }
    })
})

/////// ROUTES PUT ET PACTH //////////////////////////////
app.put('/alertes/:id', (req,res) => {    
    console.log("Body : ",req.body)
    const data = {
        Description : req.body.Description,
        Niveau : req.body.Niveau,
        DateHeure: req.body.DateHeure,
        idUtilisateur: req.body.idUtilisateur
    }
    let sql = "UPDATE `alerte` SET `Description` = ?, `Niveau` = ?, `DateHeure` = ?, `idUtilisateur` = ? WHERE `idAlerte` = ?;";
    config.query(sql, [...Object.values(data), req.params.id], (err) =>{
        if(err){
            console.log(data);
            res.json({message : "fail", Error : err});
        }else{
            res.json({message : "nice", Data : data});
        }
    })
})


//// ROUTES DELETE ////////////////////////////

app.delete("/alertes/:id", (req, res) => {
    let sql = `DELETE FROM alerte where id = ${req.params.id}`;
    config.query(sql,(err, results) =>{
        if(err){
            res.json({message : "fail", Error : err.code});
        }else{
            res.json({message : "nice", res : results});
        }
    })
});