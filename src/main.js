import "./assets/css/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./AppTwo.vue";

const pinia = createPinia();

createApp(App).use(pinia).mount("#app");
