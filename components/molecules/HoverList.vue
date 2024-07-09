<script setup lang="ts">
import AtomsIconsFViewList from '@/components/atoms/icons/FViewList.vue';
import type { Component } from 'vue';

defineProps<{
  items: Record<string, string>;
  icon?: Component;
  text?: string;
}>()
const emits = defineEmits(['li:click'])

const showList = ref(false)
const click = (item: string) => {
  showList.value = false
  emits('li:click', item)
}
</script>

<template>
  <div class="absolute bottom-0 right-0">
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
            class="py-1 px-8 hover:bg-primary hover:text-white w-full transition"
            @click="click(key)"
        >
          {{ item }}
        </li>
      </ul>
    </transition>
  </div>
</template>
