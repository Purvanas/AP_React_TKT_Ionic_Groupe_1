const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const config = require('./bdd.js');

app.use(cors);
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
// test 
app.get("/", (req, res) => {
    res.json({ message: "ok" });
  });
  

app.get("/fonctions", (req, res) => {
    let sql = "SELECT id,Libelle FROM fonction";
    config.query(sql,(err, results) =>{
        if(err) throw err
        console.log(results);
        res.json({results});
    })
});

app.post("/auth", (req, res) => {
    console.log("connection");
    const data = {
        identifiant : req.body.identifiant,
        mdp : req.body.mdp
    }
    let sql = "SELECT identifiant, mdp FROM utilisateur WHERE identifiant = ? and mdp = ?";
    config.query(sql, Object.values(data), (err, results) =>{
        if(err) throw err;
        res.json({results});
    })
});


app.get("/connectedUser", (req, res) => {
    let sql = "SELECT utilisateur.id, Nom, Prenom, NumTel, Libelle, Admin FROM utilisateur inner join fonction on fonction.id = idFonction where identifiant = ? and mdp = ?";
    config.query(sql,(err, results) =>{
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