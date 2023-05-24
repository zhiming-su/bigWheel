import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import VueLuckyCanvas from '@lucky-canvas/vue'
import store from './store';



const app = createApp(App);
app.use(router);
app.use(store);
app.use(VueLuckyCanvas);
app.mount('#app');
