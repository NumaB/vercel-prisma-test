import { initReactI18next } from "react-i18next"
import { I18nState } from "./types"
import { format as dateFormat } from "date-fns/format"
import { fr, enUS as en, Locale } from "date-fns/locale"
import { createEvent, createStore } from "effector"
import i18next from "i18next"

const supportedLang = ["fr", "en"]
const fallbackLang = "en"
const InitialLang = "fr"
const resources = {
  fr: {
    translation: {
      ...require("./locales/fr.json"),
    },
  },
  en: {
    translation: {
      ...require("./locales/en.json"),
    },
  },
}

const locales: { [key: string]: Locale } = {
  fr,
  en,
}

i18next.use(initReactI18next).init({
  // debug: true,
  fallbackLng: fallbackLang,
  interpolation: {
    escapeValue: false,
    format: (value, f, lng) => {
      let format = f

      const formatKey = "formats." + format
      const i18nforma = i18next.t(formatKey)
      if (i18nforma !== formatKey) {
        format = i18nforma
      }

      // You can extends functionality here by providing custom format function based on value and format
      if (format && value instanceof Date) {
        const locale = locales[lng || fallbackLang]
        const s = dateFormat(value, format, { locale })
        return s
      }
      if (format === "number" && (typeof value === "number" || typeof value === "bigint")) {
        return new Intl.NumberFormat(lng).format(value)
      }
      return value
    },
  },
  resources,
})

const i18n = (lng: string) => {
  const lang = supportedLang.find((l) => l === lng) || supportedLang.find((l) => lng.indexOf(l) > -1) || fallbackLang
  i18next.changeLanguage(lang)
  return {
    // eslint-disable-next-line prefer-spread, @typescript-eslint/no-explicit-any
    t: (...args: any) => i18next.t.apply(i18next, args),
    lang,
    locale: locales[lang],
    exist: i18next.exists,
  } as I18nState
}

export const actions = {
  setLang: createEvent<string>("setLang"),
}

export const store = createStore<I18nState>(i18n(InitialLang)).on(actions.setLang, (_, lang) => i18n(lang))
