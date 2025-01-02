import Vue from "vue";
import VueI18n from "vue-i18n";

// Localisation language list
import LanguageChinese from "@/core/config/languages/chinese";

Vue.use(VueI18n);

// get current selected language
const lang = localStorage.getItem("language") || "cn";

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: lang, // set locale
  messages: {   // set locale messages
    cn: LanguageChinese,
  }
});

export default i18n;
