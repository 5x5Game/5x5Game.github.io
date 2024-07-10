import ar from '@/locales/ar.json'
import fr from '@/locales/fr.json'
import en from '@/locales/en.json'

export default defineI18nConfig(() => {
  return {
    legacy: false,
    locale: 'en',
    messages: {
      ar,
      en,
      fr
    },
    locales: [
      { "code": "en", "iso": "en-US", "file": "en.json", "dir": "ltr" },
      { "code": "ar", "iso": "ar-MA", "file": "ar.json", "dir": "rtl" },
      { "code": "fr", "iso": "fr-FR", "file": "fr.json" }
    ],

  }
})
