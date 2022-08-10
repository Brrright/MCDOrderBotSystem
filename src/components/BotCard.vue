<template>
  <div v-for="bot in allBot" :key="bot.botID">
    <div class="card p-2 m-3 text-start">
      <div class="card-header">Bot {{ bot.botID }}</div>
      <div class="card-body">
        <div class="card-title" v-if="bot.workingOn != null">Working On: {{ bot.workingOn }}</div>
        <div class="card-title" v-else>Working On: (None)</div>
        <div class="card-text" v-if="bot.workingOn == null">Status: IDLE</div>
        <div class="card-text" v-else>Status: Working</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useBotStore } from '../stores/bot';

const botStore = useBotStore();
const allBot = computed(() => botStore.getAllBots);
</script>