import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./configs/route-instance";

createApp(App).use(router).mount("#app");
