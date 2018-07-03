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