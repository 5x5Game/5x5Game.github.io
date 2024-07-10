<script setup lang="ts">

</script>

<template>
  <NuxtLayout>
  <p class="mt-6"><span class="font-bold">{{ $t('about.intro_1') }}</span> {{ $t('about.intro_2') }}</p>

  <h2 class="text-3xl my-6">{{ $t('about.awaits_you') }}</h2>

  <ul class="pl-5 list-disc list-outside [&_ul]:list-[revert]">
    <li><span class="font-bold">{{ $t('about.intriguing_movement') }}</span> {{ $t('about.calculated_leaps') }}</li>

      <ul class="pl-5">
        <li>{{ $t('about.move_vertical_horizontal') }} <span class="font-bold">{{ $t('about.three_steps') }}</span> {{ $t('about.at_once') }}</li>
        <li>{{ $t('about.diagonal_thinking') }} <span class="font-bold">{{ $t('about.two_steps') }}</span> {{ $t('about.diagonal_jumps') }}</li>
      </ul>
    <li><span class="font-bold">{{ $t('about.sharpen_your_mind') }}</span> {{ $t('about.plan_your_moves') }}</li>
    <li><span class="font-bold">{{ $t('about.no_hesitation') }}:</span> {{ $t('about.game_progresses') }}</li>
  </ul>

  <h3 class="text-2xl my-6">{{ $t('about.ready_to_test') }}</h3>
  </NuxtLayout>
</template>
