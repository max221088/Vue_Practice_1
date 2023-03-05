
let pokemon = [];


const app = new Vue ({
	el: '#app',
	data: {
		isActive: false,
	},
	methods: {
		openDropController () {
			this.isActive = !this.isActive;
		}
	},
	created: function () {
		fetch("https://pokeapi.co/api/v2/pokemon/")
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		this.pokemon = data.results;
		console.log(this.pokemon);
	}.bind(this));
	}
});