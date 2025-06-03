<template>
  <div class="main-container">
    <header class="header">
      <div class="header-center">
        <img src="/logo.png" alt="Logo" class="logo" />
      </div>
    </header>

    <main class="timer-section">
      <h1>{{ getCurrentTime }}</h1>
      <router-link to="/timer-grid" class="timer-icon" aria-label="Selecionar tempo">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 18 18">
          <path d="M6.5 0a.5.5 0 0 1 .5.5V2a.5.5 0 0 1-1 0V.5A.5.5 0 0 1 6.5 0zm3 0a.5.5 0 0 1 .5.5V2a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5zM2.343 2.343a.5.5 0 0 1 .707 0l1.06 1.06a.5.5 0 1 1-.707.708l-1.06-1.06a.5.5 0 0 1 0-.708zm9.9 1.06a.5.5 0 1 1-.707-.707l1.06-1.06a.5.5 0 1 1 .707.707l-1.06 1.06zM8 3a7 7 0 1 0 0 14A7 7 0 0 0 8 3zm0 1a6 6 0 1 1 0 12A6 6 0 0 1 8 4zm0 2a.5.5 0 0 1 .5.5v3.793l2.146 2.147a.5.5 0 0 1-.708.707l-2.25-2.25A.5.5 0 0 1 7.5 9V6.5A.5.5 0 0 1 8 6zm-6.5 7a.5.5 0 0 1 .5.5v1A.5.5 0 0 1 1 15v-1a.5.5 0 0 1 .5-.5zm13 0a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5z"/>
        </svg>
      </router-link>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { computed, onMounted, onUnmounted, ref } from 'vue';

export default defineComponent({
  name: 'Home',
  setup() {
    const store = useStore();
    let clockInterval: number;
    const getCurrentTime = ref('');

    const updateCurrentTime = () => {
      const now = new Date();
      getCurrentTime.value = now.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    };

    const currentTime = computed(() => {
      const time = store.state.currentTime;
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return;
    });

    onMounted(() => {
      updateCurrentTime();
      clockInterval = setInterval(updateCurrentTime, 1000);
    });

    onUnmounted(() => {
      clearInterval(clockInterval);
    });

    return {
      currentTime,
      getCurrentTime
    };
  }
});
</script>

<style scoped>
.main-container {
  height: 100vh;
  overflow: hidden;
  background: #000;
  display: flex;
  flex-direction: column;
  position: relative;
}

.header {
  flex: 0 0 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.header-center .logo {
  height: 30vh;
  max-width: 90vw;
  object-fit: contain;
  display: block;
}

.timer-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3vh;
  position: relative;
}

.timer-section h1 {
  font-size: min(30vh, 30vw);
  line-height: 1;
  margin: 0 auto;
  text-shadow: 0 0 10px rgba(255,255,255,0.3);
  text-align: center;
}

.timer-icon {
  position: fixed;
  left: 2vw;
  bottom: 2vh;
  font-size: min(8vh, 8vw);
  color: white;
  text-decoration: none;
  transition: transform 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.timer-icon svg {
  width: 1em;
  height: 1em;
  display: block;
}

.timer-icon:focus, 
.timer-icon:hover {
  transform: scale(1.1);
}
</style>
