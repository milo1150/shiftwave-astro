import { langJson, defaultLang, type AvailableLanguage } from '@src/i18n/i18n'

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/')
  if (lang in langJson) return lang as keyof typeof langJson
  return defaultLang
}

export function getBaseLang(lang: AvailableLanguage) {
  if (lang in langJson) return lang as keyof typeof langJson
  return defaultLang
}

export function useTranslations(lang: AvailableLanguage) {
  return function t(key: i18KeyValue) {
    return langJson[lang][key] || langJson[defaultLang][key]
  }
}

export type i18KeyValue = keyof (typeof langJson)[typeof defaultLang]
