

let API = "https://pokeapi.co/api/v2/pokemon/";

const app = new Vue ({
	el: '#app',
	data: {
		isActive: false,
		pokemon: [],
		renderData: [],
		filtQuery: null,
		delPokemon: [],
	},
	methods: {
		openDropController () {
			this.isActive = !this.isActive;
		},
		filterController () {
			let query = this.filtQuery.toLowerCase();
			this.renderData = this.pokemon.filter(function (el) {
				if (el.name.toLowerCase().indexOf(query) != -1) {
					return true;
				} else {
					return false;
				}
			});
		},
		delElementController () {
			let checkboxes = document.querySelectorAll('.checkbox');
			for (i = checkboxes.length - 1; i >= 0; i--) {
				if (checkboxes[i].checked) {
					let delIndex = checkboxes[i].dataset.index;
					this.delPokemon = this.renderData.splice(delIndex, 1);
					console.log(this.delPokemon[0].name);
					checkboxes[i].checked = false;
				};

			};
		this.pokemon = this.renderData;
		}
		
	},
	created: function () {
		if (localStorage.getItem('pokemon') == null) {
			fetch(API)
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
							localStorage.setItem("pokemon", JSON.stringify(pokList));
							this.renderData = JSON.parse(localStorage.getItem("pokemon"));
						}				
					}.bind(this));
				}.bind(this));
			}.bind(this));
		}
		this.renderData = JSON.parse(localStorage.getItem("pokemon"));
		this.pokemon = this.renderData;
	}
});