const express = require("express");
const app = express();
const port = 8080;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });


app.get("/ListSupport", (req, res) => {
    let sql = "SELECT id,nom FROM support";
    config.query(sql,(err, results) =>{
        if(err) throw err
        console.log(results);
        res.json({results});
    })
});


app.post('/add/jeux', (req,res) => {    
    const data = {
        nom : req.body.nom,
        idSupport : req.body.idSupport,
        idGenre : req.body.idSupport
    }
    let sql = 'INSERT INTO jeux(nom,idSupport,idGenre) VALUES (?,?,?)';
    config.query(sql, Object.values(data), (err) =>{
        if(err){
            res.json({message : "fail", Error : err.code});
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