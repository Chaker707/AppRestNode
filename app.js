

var express = require('express')
var app = express()

var bodyParser = require('body-parser')

//configuration du body-parser pour supporter les JSON et url encoded
app.use( bodyParser.json() );                     
app.use(bodyParser.urlencoded({extended: true})); 


//récupération de la connexion à la base de données 
var connection = require('./config/connexion')

// Récupérer tous les produits  
app.get('/', (request, response) => {

    connection.query('SELECT * from produit', function (error, results, fields) {
        if (error) throw error;
        response.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": results
        }));
      });

})

// Récupérer un produit par son id  
app.get('/produit/:id', (request, response) => {

    connection.query('SELECT * from produit where id = ?', [request.params.id] , (error, results) => {
        if (error) throw error;
        //console.log(un element : ', results[1].lib);
        response.send(results)
      });

})

// Ajouter un produit
app.post('/produit', (request, response) => {    
    var data = request.body     
    connection.query('insert into produit values (null, ? , ? , ?) ', [data.lib, data.prix, data.qte ] , (error, results) => {
        if (error) throw error;
        response.send(results)
    })   
    
})


// Modifier un produit
app.put('/produit', (request, response) => {
    var data= request.body
    console.log(data)
    connection.query('update produit set lib = ? , prix = ? , qte = ? where id = ? ', [data.lib, data.prix, data.qte, data.id] ,
                         (error, results) => {
        if (error) throw error;
        response.send(results)
    })    
})

// Supprimer un produit
app.delete('/produit', (request, response) => {
    var data= request.body 
    connection.query('delete from produit where id = ? ', [data.id] , (error, results) => {
        if (error) throw error;
        response.send("Produit supprimé avec succès ")
    })    
})




app.listen(3000)

