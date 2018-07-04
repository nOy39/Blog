
var bearsApi = Vue.resource('/blog/bears{/id}');

function findIndex(id, bears) {
    let i = 0;
    let index = 0;
    bears.forEach(function (element) {
        if (element.id === id) {
            console.log(i);
           index = i;
        }
        i++;
    })
    return index;
}

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
                        this.bears.splice(findIndex(this.id, this.bears),1,data);
                        // this.bears.splice(index, 1, Object.assign({},this.bears[index], {param:value}))
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
        props: ['bears','bearsApi'],
        data: function () {
            return {
                bear: null
            }
        },
        template:
            `<div>
            <input-form :bears="bears" :bear-attr="bear"/>
            <div class="row">
                <div v-for="(bear, index) in bears" :key="index">                   
                        <div class="card-body">
                            <h5 class="card-title">{{ bear.title }}</h5>
                            <p class="card-text">{{ bear.body }}</p>
                            <span>{{ bear. id }}</span>
                            <button type="button" class="btn btn-primary" @click="edit(bear)">Изменить</button>
                            <button type="button" class="btn btn-danger" @click="del(bear)">Удалить</button>
                        </div>
                  
                </div>
            </div>
        </div>`,
        methods: {
            edit: function (bear) {
                this.bear = bear;
            },
            del(bear) {

                bearsApi.remove({id: bear.id}).then(result => {
                    this.bears.splice(findIndex(bear.id,this.bears), 1)

                })
            }
        },
        created: function () {
            bearsApi.get().then(result =>
                result.json().then(data =>
                    data.forEach(bear => this.bears.push(bear))
                )
            )
        },
    }
);

new Vue({
    el:"#app",
    template: `<bear-list :bears="bears" />`,
    data: {
        bears: [
        ],
        bear: []
    }
})