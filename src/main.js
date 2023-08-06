import { createApp } from "vue";
import { createPinia } from "pinia";
// SIMPLEBAR SCROLL
import Scrollbar from "simplebar-vue";

import App from "./App.vue";

// STYLES
import "simplebar-vue/dist/simplebar.min.css";
import "./assets/css/main.css";

const app = createApp(App);
const pinia = createPinia();

app.component("Scrollbar", Scrollbar);
app.use(pinia);

app.mount("#app");
