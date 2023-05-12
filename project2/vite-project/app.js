const Home = { template: '<div class="myForm"><form @submit.prevent="submitForm"><div><label for="name">姓名：</label><input id="name" type="text" v-model="name" required></div><div><label for="gender">性別：</label><select id="gender" v-model="gender" required><option value="男">男</option><option value="女">女</option></select></div><div><label for="address">地址：</label><input type="text" id="address" v-model="address" /></div><div><label for="phone">手機：</label><input type="text" id="phone" v-model="phone" /></div><button type="submit">提交</button></form></div>', data() { return { name: '', gender: '',  address: '',  phone: '', }; }, methods: { submitForm() { const data = { name: this.name, gender: this.gender, address: this.address, phone: this.phone}; axios.post('/save', data) .then(() => { this.$router.push('/results'); }) .catch(error => console.log(error)); }, }, };

const Results = { template: '<div class="myList"><ul><li v-for="(contact, index) in contacts" :key="index"><p>姓名：{{ contact.name }}</p><p>性別：{{ contact.gender }}</p><p>地址：{{ contact.address }}</p><p>手機：{{ contact.phone }}</p></li></ul></div>', data() { return { contacts: [], }; }, created() { axios.get('/contacts') .then(response => { this.contacts = response.data; }) .catch(error => console.log(error)); }, };

const routes = [ { path: '/', component: Home }, { path: '/results', component: Results }, ];

const router = VueRouter.createRouter({ history: VueRouter.createWebHashHistory(), routes, });

const app = Vue.createApp({});
app.use(router);
app.mount('#app');
