var bearsApi = Vue.resource('/blog/bears/');

Vue.component('bear-list', {
    props: ['bears'],
    template:
        '<div>' +
        '   <ul>' +
        '       <li v-for="bear in bears">' +
                    '<span v-bind:title="bear.body">{{ bear.title}} </span>' +
        '       </li>' +
        '   </ul>' +
        '</div>',
    created: function () {
        bearsApi.get().then(result =>
            result.json().then(data =>
                data.forEach(bear => this.bears.push(bear))
                )
            )
        }
    }
)


new Vue({
    el:"#app",
    template: '<bear-list :bears="bears" />',
    data: {
        bears: [
            // {
            //     name: 'Гризли',
            //     status: false
            // },
            // {
            //     name: 'Бурый',
            //     status: false
            // },
            // {
            //     name: 'Губач',
            //     status: false
            // },
            // {
            //     name: 'Панда',
            //     status: false
            // },
            // {
            //     name: 'Тэдди',
            //     status: true
            // }
        ]
    }
})