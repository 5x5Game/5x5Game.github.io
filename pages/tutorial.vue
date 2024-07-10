<script setup lang="ts">

</script>

<template>
  <NuxtLayout>
    <p>{{ $t('tutorial.welcome') }}</p>

    <h2 class="text-3xl font-bold my-5">{{ $t('tutorial.game_overview') }}</h2>
    <p>{{ $t('tutorial.game_overview_1') }}</p>

    <h2 class="text-3xl font-bold my-5">{{ $t('tutorial.how_to_play') }}</h2>
    <h3 class="text-2xl font-bold my-5">{{ $t('tutorial.starting_the_game') }}</h3>

    <p>{{ $t('tutorial.starting_the_game_1') }}</p>

    <h3 class="text-2xl font-bold my-5">{{ $t('tutorial.movement_rules') }}</h3>

    <h2 class="text-3xl font-bold my-5">{{ $t('tutorial.vertical_horizontal_moves') }}</h2>

    <p>{{ $t('tutorial.vertical_horizontal_moves_1') }}</p>

    <h3 class="text-2xl font-bold my-5">{{ $t('tutorial.diagonal_moves') }}</h3>

    <p>{{ $t('tutorial.diagonal_moves_1') }}</p>

    <h3 class="text-2xl font-bold my-5">{{ $t('tutorial.objective') }}</h3>

    <p>{{ $t('tutorial.objective_1') }}</p>

    <h2 class="text-3xl font-bold my-5">{{ $t('tutorial.gameplay') }}</h2>

    <p>{{ $t('tutorial.gameplay_1') }}</p>

  </NuxtLayout>
</template>
