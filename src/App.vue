<template>
  <div id="app">
    <button @click="showComponent('W')">Load Working component</button>
    <button @click="showComponent('L')">Load not working component</button>

    <div v-if="currentComponent === 'W'">
      <h3>Working :</h3>
      <Working />
    </div>
    <div v-if="currentComponent === 'L'">
      <h3>Not working :</h3>
      <NotWorking />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Working from "@/components/Working.md";
import NotWorking from "@/components/NotWorking.md";

const currentComponent = ref(null);

const showComponent = (component) => {
  currentComponent.value = component;
};
</script>
