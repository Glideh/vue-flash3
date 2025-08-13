<style lang="scss">
@use 'flash';
</style>


<template>
    <div class="notifications-container">
        <div v-for="notif in Flash.notifications.value" @click="Flash.remove(notif)" class="notification"
            :class="notif.type">
            <div class="notif-icon" v-if="!noicon">
                <slot name="icons" :type="notif.type">
                    <template v-if="notif.type === 'success'">&check;</template>
                    <template v-if="notif.type === 'error'">&times;</template>
                    <template v-if="notif.type === 'info'">&#8981;</template>
                </slot>
            </div>
            <div class="notif-message"><div v-html="notif.message"></div></div>
        </div>
        <slot></slot>
    </div>
</template>


<script setup lang="ts">
import * as Flash from './instance'

defineProps<{ noicon?: boolean }>()
</script>
