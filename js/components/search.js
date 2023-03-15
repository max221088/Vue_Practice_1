Vue.component ('search', {
    data: function () {
        return {
            filtQuery: null,
            filteredPokemon: []
        }
    },
    props: ['pokemon'],
    methods: {
        filterQuery: function() {
            let query = this.filtQuery.toLowerCase();
            this.filteredPokemon = this.pokemon.filter(function (el) {
				if (el.name.toLowerCase().indexOf(query) != -1) {
					return true;
				} else {
					return false;
				}
			});
            this.$emit('search-data', this.filteredPokemon);
        }
    },
    template: '<input type="text" v-model="filtQuery" @input="filterQuery()"'
    + 'placeholder="Search for User,email,address..."'
    + 'class="input-search"/>'
})