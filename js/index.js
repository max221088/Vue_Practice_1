

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
		delElementController (event) {
			let checkboxes = document.querySelectorAll('.checkbox');
			console.log(checkboxes);
			//console.log(checkboxes[0].dataset.index);
			for (i = checkboxes.length - 1; i >= 0; i--) {
    			//console.log(checkboxes[i]);
				if (checkboxes[i].checked) {
					let delIndex = checkboxes[i].dataset.index;
					console.log(delIndex);
					this.delPokemon = this.renderData.splice(delIndex, 1);
				};

			};
			// checkboxes.forEach(function (el) {
				// if (el.checked) {
				// 	let delIndex = el.dataset.index;
				// 	console.log(delIndex);
				// 	this.delPokemon = this.renderData.splice(delIndex, 1);
				// 	this.pokemon = this.renderData;
				// }
			// }.bind(this))

			// let delIndex = event.target.getAttribute("data-index");
			// this.delPokemon = this.renderData.splice(delIndex, 1);
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
					//console.log(pokList);
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