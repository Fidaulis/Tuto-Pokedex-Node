var router = require('express').Router();
var mongoose = require('mongoose');
var Type = mongoose.model('Type');
var Pokemon = mongoose.model('Pokemon');


router.get('/new', (req, res) =>{
	Pokemon.find({}).then(pokemons => {
		var type = new Type;
		res.render('types/edit.html', {pokemons: pokemons, type : type, endpoint: '/types'});
	});
});

router.get('/edit/:id', (req, res) =>{
	Pokemon.find({}).then(pokemons => {
		Type.findById(req.params.id).then(type => {
		res.render('types/edit.html', {pokemons: pokemons, type : type, endpoint: '/types/' + type._id.toString()});
		});
	});
});

router.get('/delete/:id', (req, res) => {
	Type.findOneAndRemove({_id : req.params.id}).then(() =>{ 
			res.redirect('/');
	});
});

router.get('/:type', (req, res) => {
	Type.findOne({name: req.params.type }).populate('pokemons').then(type => {
		if (!type) return res.status(404).send('Type introuvablee');
		res.render('types/show.html', {
			type: type,
			pokemons: type.pokemons
		});
	});
});

router.post('/:id?', (req, res) => {
	// console.log(req.params.id);
	// new Promise((resolve, reject) => {
	// 	if(req.params.id){
	// 		Type.findById(req.params.id).then(resolve, reject);
	// 	}
	// 	else {
	// 		resolve(new Type());
	// 	}
	// }).then(type => {
	// 	type.name = req.body.name;
	// 	type.color = req.body.color;
	// 	// type.pokemons = req.body.pokemons;
	// 	// if (req.file){
	// 	// 	pokemon.picture = req.file.filename;
	// 	// }
	// 	return type.save();
	// }).then(() => {
	// 	res.redirect('/types/' + req.body.name);
	// }, err => console.log(err));
});

module.exports = router;