<script setup lang="ts">
import type { Component } from 'vue';
import type { Direction } from '@/types';

const { cn } = useCn()

const props = defineProps<{
  items: Record<string, string>;
  icon?: Component;
  text?: string;
  direction?: Direction;
}>()
const emits = defineEmits(['li:click'])
const direction = computed(_ => {
  if (props.direction === 'left') {
    return 'left-0'
  }
  return 'right-0'
})
const showList = ref(false)
const click = (item: string) => {
  showList.value = false
  emits('li:click', item)
}
</script>

<template>
  <div :class="cn(`fixed bottom-0 ${direction} z-50`)">
    <div class="flex justify-end w-60">
      <div class="flex items-end p-4 m-4">
        <AtomsFButton
          :icon
          :text
          @mouseover="showList = true"
          @mouseleave="showList = false"
          class="rounded-full h-14 w-14"
        />
      </div>
      <transition name="fade">
        <ul
          v-if="showList"
          @mouseover="showList = true"
          @mouseleave="showList = false"
          class="absolute bottom-20 right-4 w-full bg-white shadow-lg rounded mr-4"
        >
          <li v-for="(item, key, index) of items" :key="index"
              class="py-1 px-8 hover:bg-primary hover:text-white w-full transition cursor-pointer"
              @click="() => click(key)"
              @touchstart="() => click(key)"
          >
            {{ item }}
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>
