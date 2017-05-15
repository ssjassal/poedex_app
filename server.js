var express = require('express');
var bodyParser = require('body-parser');
var pokemon = require('./models/pokemon.js');
var methodOverride = require('method-override');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));
//
app.get('/pokemon/', function(req, res){
  res.render('pokemon/index.ejs', {
    pokemon:pokemon
  });
});

app.get('/pokemon/create', function(req, res){
  res.render('pokemon/create.ejs', {
    pokemon:pokemon
  });
});

app.get('/pokemon/:id', function(req, res){
  res.render('pokemon/show.ejs', {
    pokemon:pokemon[req.params.id],
    index: req.params.id
  });
});

app.get('/pokemon/:id/edit', function(req, res){
  res.render('pokemon/edit.ejs',{
      pokemon: pokemon[req.params.id],
      index: req.params.id,
      delete: req.params.id,
    });
});

app.post('/pokemon', function(req, res){
  pokemon.push(req.body);
  var newPokemon = pokemon.length - 1;
  console.log(newPokemon);
  res.redirect('/pokemon/'+newPokemon);
});

app.put('/pokemon/:id', function(req, res){
  pokemon[req.params.id] = req.body;
  res.redirect('/pokemon');
});

app.delete('/pokemon/:index', function(req, res){
  pokemon.splice(req.params.id, 1);
  res.redirect('/pokemon');
});

app.listen(3000,function(){
  console.log('listening');
});
