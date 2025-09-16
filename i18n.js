import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

// translations
const resources = {
  en: {
    translation: {
      hello: "Hello Farmer",
      date: "Sunday, 01 Dec 2024",
      search: "Search...",
      maize: "Maize",
      grapes: "Grapes",
      commodities: "Commodities and food",
    },
  },
  sw: {
    translation: {
      hello: "Habari Mkulima",
      date: "Jumapili, 01 Des 2024",
      search: "Tafuta...",
      maize: "Mahindi",
      grapes: "Zabibu",
      commodities: "Bidhaa na Chakula",
    },
  },
};

// detect device language
const fallback = { languageTag: "en", isRTL: false };
const { languageTag } = Localization.getLocales()[0] || fallback;

i18n.use(initReactI18next).init({
  resources,
  lng: languageTag, // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
