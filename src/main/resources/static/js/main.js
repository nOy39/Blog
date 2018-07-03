
var bearsApi = Vue.resource('/blog/bears/');

Vue.component('input-form', {
    props: ['bears','bearAttr'],
    data: function() {
        return {
            title: '',
            body: '',
            id:''
        }
    },
    watch: {
        bearAttr: function (newVal) {
            this.title = newVal.title;
            this.body = newVal.body;
            this.id = newVal.id
        }
    },

    template:
    `<div>
       <hr>
        <input type="text" placeholder="Blog name" v-model="title"/>
        <input type="text" placeholder="Blog body" v-model="body">
        <input type="button" value="Save" @click="save"/>
     </div> `,
    methods: {
        save() {
            var bear = {
                title: this.title,
                body: this.body,
                id: this.id
            };
            if (this.id) {
                bearsApi.update(bear).then(result =>
                    result.json().then(data => {
                        var index = this.id;
                        this.bears.splice(index,1,data);
                        this.title = '';
                        this.body = '';
                        this.id = '';
                    }))
            } else {
                bearsApi.save({}, bear).then(result =>
                    result.json().then(data => {
                        this.bears.push(bear);
                        this.title = '';
                        this.body = '';
                    }))
                }
            }
        }
    });

Vue.component('bear-list', {
    props: ['bears',],
    data: function() {
        return {
            bear: null
        }
    },
    template:
        `<div>
            <input-form :bears="bears" :bear-attr="bear"/>
            <div class="row">
                <div class="col-3" v-for="bear in bears" :key="bear.id">
                    <div class="card" style="width: 18rem;">
                   
                        <div class="card-body">
                            <h5 class="card-title">{{ bear.title }}</h5>
                            <p class="card-text">{{ bear.body }}</p>
                            <button type="button" class="btn btn-primary" @click="edit(bear)">Изменить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`,
    methods: {
        edit:function(bear) {
            this.bear = bear;
        }
    },
    created: function () {
        bearsApi.get().then(result =>
            result.json().then(data =>
                data.forEach(bear => this.bears.push(bear))
                )
            )
        }
    }
);


new Vue({
    el:"#app",
    template: '<bear-list :bears="bears" />',
    data: {
        bears: [
        ],
        bear: []
    }
})