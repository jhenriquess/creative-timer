<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();
    
    onMounted(() => {
      store.dispatch('initializeStore');
    });
  }
});
</script>

<style>
html, body, #app {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: #000;
}

body {
  font-family: Arial, sans-serif;
  color: #fff;
}

#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Remove paddings/margins and set min/max heights to avoid scroll */
.main-container,
.header,
.timer-section,
.footer {
  box-sizing: border-box;
  width: 100%;
  max-width: 100vw;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

/* Centralize content and avoid overflow */
.main-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
  justify-content: center;
  align-items: center;
  background: #000;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  font-size: 18px;
}

.header-center .logo {
  height: 50px;
}

.timer-section {
  text-align: center;
  font-size: 24px;
}

.timer-display {
  font-size: 96px;
  font-weight: bold;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  font-size: 18px;
}

.control-button {
  font-size: 24px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.timer-icon {
  font-size: 48px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  margin-top: 20px;
  padding: 10px;
  transition: transform 0.3s;
}

.timer-icon:hover {
  transform: scale(1.1);
}

.app {
  text-align: center;
  margin-top: 60px;
}
</style>