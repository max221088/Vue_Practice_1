Vue.component ('message', {
    data: function () {
        return {
            isShow: false,
            dis: 0,
            pokName: null,
        }
    },
    props: ['name'],
    methods: {
        sendMessage () {
            this.pokName = this.name.join(", ");
            this.isShow = true;
            setTimeout(() => this.isShow = false , 3000);
        }

    },
    template: '<div class="message" v-bind:class="{active: isShow}" v-bind:style="{bottom: dis}">'+
        '<div class="text-message"><div>Pokemon</div> {{pokName}} <div>have been removed</div></div>'+
            '</div>'
})