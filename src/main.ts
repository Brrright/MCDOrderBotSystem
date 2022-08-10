import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

const app = createApp(App);

app.use(createPinia()); // pinia instance to be used (root store)

app.mount("#app");
