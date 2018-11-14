var express = require('express');
var mongoose = require('mongoose');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var multer = require('multer');

var upload = multer({
	dest: __dirname + '/uploads'
});
mongoose.connect('mongodb://localhost/pokedex', { useNewUrlParser: true });

require('./models/pokemon');
require('./models/type');

var app = express();

app.use(bodyParser.urlencoded({ extended: true })); // part 3
app.use(upload.single("file"));  // nom du champ html a traiter

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use('/', require('./routes/pokemons'));
app.use('/types', require('./routes/types'));

app.use('/uploads', express.static(__dirname + '/uploads'));

nunjucks.configure('views', {
	autoescape: true,
	express: app
});
console.log("pokedex bieeeen lancé sur le port 3000");
app.listen(3000);