const express = require("express");
const app = express();
const port = 8080;
const config = require('./bdd.js');

app.use(express.json());
app.use(
    express.urlencoded({
        extended:true,
    })
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });

//REOUTES GETS ⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇
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

/*

*/

app.get("/EncyclopedieFiche/:idEspece", (req, res) => {
    const idEspece = req.params.idEspece;
    let sql = "SELECT DISTINCT espece.id, espece.Libelle as Libelle, espece.tailleMin, espece.tailleMax, espece.dureeGestationJours, espece.duréeVie, espece.Description, idEnclos, regime.Libelle as Regime FROM `espece` INNER join animal on espece.id = idEspece INNER JOIN regime on idRegime = regime.id WHERE espece.id ="+ idEspece +";";
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
    let sql = "SELECT mission.id, mission.idEnclos, idAnimal, Nom, Description, DateHeureAttribution FROM mission LEFT JOIN animal on animal.id=idAnimal WHERE mission.idUtilisateur=?; ";
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


app.delete("/del/jeux/:id", (req, res) => {
    let sql = `DELETE FROM jeux where id = ${req.params.id}`;
    config.query(sql,(err, results) =>{
        if(err){
            res.json({message : "fail", Error : err.code});
        }else{
            res.json({message : "nice", res : results});
        }
    })
});