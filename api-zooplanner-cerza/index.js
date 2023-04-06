const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const config = require('./bdd.js');

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

app.get("/", (req, res) => {
    res.json({ message: "ok" });
});

userAuth = (identifiant, mdp) => {
    return new Promise((resolve, reject) => {
      config.query(
        "SELECT id, Nom, Prenom, NumTel, Admin FROM utilisateur WHERE identifiant = '"+identifiant+"' and mdp = '"+mdp+"'",
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