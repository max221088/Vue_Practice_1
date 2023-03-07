



const app = new Vue ({
	el: '#app',
	data: {
		isActive: false,
		pokemon: [],
	},
	methods: {
		openDropController () {
			this.isActive = !this.isActive;
		}
	},
	created: function () {
		if (localStorage.getItem('pokemon') == null) {
			fetch("https://pokeapi.co/api/v2/pokemon/")
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		let pok = data.results;
		let pokList = [];
		pok.forEach(function (el) {
			fetch(el.url)
			.then(function (response) {
				return response.json();
			})
			.then(function (data){
				pokList.push(data);
				if (pokList.length == pok.length) {
					console.log(pokList);
					localStorage.setItem("pokemon", JSON.stringify(pokList));
				}				
			});
		});
	}.bind(this));
		}
		this.pokemon = JSON.parse(localStorage.getItem("pokemon"));
		//console.log(this.pokemon);
	}
});