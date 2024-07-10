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
  }
})
