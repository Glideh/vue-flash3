<style lang="scss">
@use "flash/style";
/* with (
  $flash-colors: (
    toto: red
  )
)*/
.link {
  text-decoration: underline;
  cursor: pointer;
  margin: -10px -10px -10px 0;
  padding: 10px 10px 10px 0;
}
</style>

<template>
  <Flash>
    <template #icons="slotProps">
      <IconInfo v-if="slotProps.type === 'info'" />
    </template>
  </Flash>
</template>

<script setup lang="ts">
import { onMounted, h } from 'vue'
import { Flash, instance as FlashI } from './flash'
import IconInfo from './icons/info-circle-solid.svg'

function popFlash(e: Event) {
  e.stopPropagation()
  FlashI.remove(FlashI.notifications.value[0])
}

onMounted(() => {
  FlashI.add('That\'s a very nice success message', 'success')
  FlashI.add('Oups some error has occured !', 'error')
  FlashI.add('Some info won\'t hurt', 'info')
  FlashI.add({
    render: () => h('div', [
      'This is a reactive message ',
      h('a', {
        onClick: popFlash,
        class: 'link'
      }, 'now do something reactive')
    ]),
  }, 'success')
})
</script>
