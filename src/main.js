import { createApp } from "vue";
// SIMPLEBAR SCROLL
import Scrollbar from "simplebar-vue";

import App from "./AppTwo.vue";

// STYLES
import "simplebar-vue/dist/simplebar.min.css";
import "./assets/css/main.css";

const app = createApp(App);

app.component("Scrollbar", Scrollbar);

app.mount("#app");
