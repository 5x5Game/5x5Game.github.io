<script setup lang="ts">
import AtomsIconsFViewList from '@/components/atoms/icons/FViewList.vue';
import type { Direction } from '@/types';

const { locale, setLocale } = useI18n()
const localeRoute = useLocaleRoute()
const { t } = useI18n()
const direction = computed<Direction>(_ => {
  if (locale.value === 'ar') {
    return 'left'
  }
  return 'right'
})
await setLocale(locale.value)
const currentDate = new Date().getFullYear();
useHead({
  htmlAttrs: {
    lang: locale.value,
    dir: locale.value === 'ar' ? 'rtl' : 'ltr',
  }
})
const items: Record<string, string> = {
  index: t('home'),
  about: t('about.page'),
  tutorial: t('tutorial.page'),
  issues: t('issues.page'),
}
const goTo = (link: string) => {
  const route = localeRoute({ name: link })
  if (route) {
    return navigateTo(route.fullPath)
  }
}
</script>

<template>
  <div class="bg-white flex flex-col justify-start items-center gap-6 pt-7 px-4 h-lvh w-lvw">
    <div class="flex justify-between items-center gap-2 w-full lg:px-8 md:px-4 sm:px-2">
      <div class="flex justify-start gap-2 items-center">
        <div class="header font-extrabold text-xl md:text-4xl text-primary">5X5Game</div>
        <slot name="start" />
      </div>
      <div class="flex flex-col md:flex-row justify-end md:gap-2 items-center">
        <slot name="score" />
        <slot name="best_score" />
      </div>
    </div>
    <slot />
    <MoleculesHoverList
      :icon="AtomsIconsFViewList"
      :items="items"
      @li:click="goTo"
      :direction
    />
  </div>
  <div class="absolute w-full left-0 right-0 bottom-5">
    <p class="flex justify-center">
      © 2014–{{ currentDate }} <a href="#" class="px-4" target="_blank">Karim Oulad Chalha</a>
    </p>
  </div>
</template>
