import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment'
import store from './store';
import 'vue-select/dist/vue-select.css';
import './assets/styles/main.scss';
import VueAwesomePaginate from "vue-awesome-paginate";

const app = createApp(App);
app.config.globalProperties.$moment = moment;
app.use(router)
app.mount('#app');
app.use(store);
app.use(VueAwesomePaginate)
