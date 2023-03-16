

let API = "https://pokeapi.co/api/v2/pokemon/";

const app = new Vue ({
	el: '#app',
	data: {
		isActive: false,
		pokemon: [],
		renderData: [],
		delName: [],
		delPokemon: [],
	},
	methods: {
		openDropController () {
			this.isActive = !this.isActive;
		},
		searchData: function (data) {
			this.renderData = data;
		},
		delElementController () {
			let checkboxes = document.querySelectorAll('.checkbox');
			for (i = checkboxes.length - 1; i >= 0; i--) {
				if (checkboxes[i].checked) {
					let delIndex = checkboxes[i].dataset.index;
					this.delPokemon = this.renderData.splice(delIndex, 1);
					this.delName.push(this.delPokemon[0].name);
					checkboxes[i].checked = false;
				};
			};
		this.$refs.message.sendMessage();
		this.pokemon = this.renderData;
		this.delName = [];
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