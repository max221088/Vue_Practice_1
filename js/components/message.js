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
            // this.pokName = this.name.join();
            // this.isShow = !this.isShow;
            for ( i = 0; i < this.name.length; i++) {
                this.dis = i * 50;
                console.log(this.dis);
                this.pokName = this.name[i];
                console.log(this.pokName);
                this.isShow = true;
            }
            //this.isShow = true;
            //setTimeout(function(){this.isShow = false}, 200);
            console.log(this.name)
        }

    },
    template: '<div class="message" v-bind:class="{active: isShow}">'+
        '<p class="text-message">{{pokName}} delete</p>'+
            '</div>'
})