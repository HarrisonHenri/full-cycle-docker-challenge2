const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'fullcycledb',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)


app.get('/', (_,res) => {
  insertRandomName();
  seletctNames(res);
})

function seletctNames(res){
  let response = '<h1>Full Cycle</h1><ul>';
  let namesList = [];
  const sql = "SELECT * FROM PEOPLE"

  connection.query(sql, (_, queryResult) => {
    queryResult.map((row) => {
      namesList.push(`<li>${row.name}</li>`);
    });
    response += namesList.join().replaceAll(",", "");
    response += "</ul>";
    res.send(response);
  });
}

function insertRandomName(){
  const sql = `INSERT INTO PEOPLE (name) VALUES('Name ${Math.round(Math.random()*100000)}')`;
  console.log(sql);

  connection.query(sql);
}

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})