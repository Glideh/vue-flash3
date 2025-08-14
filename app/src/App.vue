<style lang="scss">
@use "flash";
</style>

<template>
  <Flash>
    <template #icons="slotProps">
      <IconInfo v-if="slotProps.type === 'info'" />
    </template>
  </Flash>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Flash, instance as FlashI } from './flash'
import IconInfo from './icons/info-circle-solid.svg'

onMounted(() => {
  FlashI.add('That\'s a very nice success message', 'success')
  FlashI.add('Oups some error has occured !', 'error')
  FlashI.add('Some info won\'t hurt', 'info')
})
</script>
