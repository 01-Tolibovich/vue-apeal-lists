import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment'
import store from './store';
import './assets/styles/main.scss';

const app = createApp(App);
app.config.globalProperties.$moment = moment;

app.use(router)

app.mount('#app');

app.use(store)
