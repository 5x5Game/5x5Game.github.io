<script setup lang="ts">
import AtomsIconsFViewList from '@/components/atoms/icons/FViewList.vue';
import type { Direction } from '@/types';

const { locale, setLocale } = useI18n()
const localeRoute = useLocaleRoute()
const { t } = useI18n()

await setLocale(locale.value)
const direction = computed<Direction>(_ => {
  if (locale.value === 'ar') {
    return 'left'
  }
  return 'right'
})
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
        <div class="header font-extrabold lg:text-4xl sm:text-xl md:text-3xl text-primary">5X5Game</div>
      </div>
      <div class="flex justify-end gap-2 items-center">
        <slot name="nav" />
      </div>
    </div>
    <div class="container mt-12">
      <slot />
    </div>
    <MoleculesHoverList
      :icon="AtomsIconsFViewList"
      :items="items"
      @li:click="goTo"
      :direction
    />

  </div>
  <div class="fixed w-full left-0 right-0 bottom-0 py-5 bg-white">
    <p class="flex justify-center">
      © 2014–{{ currentDate }} <a href="#" class="px-4" target="_blank"> Karim Oulad Chalha</a>
    </p>
  </div>
</template>
