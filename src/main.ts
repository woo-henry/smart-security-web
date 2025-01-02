import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import i18n from "@/core/config/i18n";
import "@/core/config/types";
import "@/core/config/axios";

router.beforeEach((to, from, next) => {
  if(to.meta && to.meta.title) {
    document.title = i18n.t("Languages.Global.Application.Name").toString() + " - " + i18n.t(to.meta.title).toString();
  } else if(from.meta && from.meta.title) {
    document.title = i18n.t("Languages.Global.Application.Name").toString() + " - " + i18n.t(from.meta.title).toString();
  } else {
    document.title = i18n.t("Languages.Global.Application.Name").toString();
  }

  if(to.name !== "login") {
    const user = sessionStorage.getItem("user");
    if(user === null) {
      next({ name: "login", replace: true });
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
