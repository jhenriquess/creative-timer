<template>
  <div class="timer-grid" @keydown.escape="goBack">
    <div class="header-center">
      <img src="/logo.png" alt="Logo" class="logo" />
      <div class="current-time">{{ getCurrentTime }}</div>
    </div>
    <div class="grid-container">
      <button 
        v-for="time in times" 
        :key="time" 
        class="time-button"
        @click="selectTime(time)"
        @keydown.left="focusPrevious($event)"
        @keydown.right="focusNext($event)"
        @keydown.up="focusUp($event)"
        @keydown.down="focusDown($event)"
        @keydown.enter="selectTime(time)"
        @keydown.escape="goBack"
        :ref="el => { if(el) buttons.push(el) }"
      >
        {{ formatTime(time) }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'TimerGrid',
  setup() {
    const store = useStore();
    const router = useRouter();
    const times = [3, 60, 120, 180, 240, 314, 374, 420, 480, 540, 600, 720, 900, 1200, 1800];

    const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return remainingSeconds > 0 
        ? `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
        : minutes < 60 ? `${minutes}:00` : `${Math.floor(minutes / 60)}:${(minutes % 60).toString().padStart(2, '0')}`;
    };

    const selectTime = (time: number) => {
      store.commit('setSelectedTime', time);
      router.push('/countdown');
    };

    const goBack = () => {
      router.push('/');
    };

    const buttons = ref<HTMLElement[]>([]);

    const focusPrevious = (event: KeyboardEvent) => {
      const buttons = document.querySelectorAll('.time-button');
      const currentIndex = Array.from(buttons).indexOf(event.target as Element);
      const newIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
      (buttons[newIndex] as HTMLElement).focus();
    };

    const focusNext = (event: KeyboardEvent) => {
      const buttons = document.querySelectorAll('.time-button');
      const currentIndex = Array.from(buttons).indexOf(event.target as Element);
      const newIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
      (buttons[newIndex] as HTMLElement).focus();
    };

    const focusUp = (event: KeyboardEvent) => {
      const buttons = document.querySelectorAll('.time-button');
      const currentIndex = Array.from(buttons).indexOf(event.target as Element);
      const newIndex = currentIndex >= 5 ? currentIndex - 5 : currentIndex + 10;
      if (newIndex < buttons.length) {
        (buttons[newIndex] as HTMLElement).focus();
      }
    };

    const focusDown = (event: KeyboardEvent) => {
      const buttons = document.querySelectorAll('.time-button');
      const currentIndex = Array.from(buttons).indexOf(event.target as Element);
      const newIndex = currentIndex < buttons.length - 5 ? currentIndex + 5 : currentIndex - 10;
      if (newIndex >= 0) {
        (buttons[newIndex] as HTMLElement).focus();
      }
    };

    const getCurrentTime = ref('');

    const updateCurrentTime = () => {
      const now = new Date();
      getCurrentTime.value = now.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    };

    let clockInterval: number;

    onMounted(() => {
      updateCurrentTime();
      clockInterval = setInterval(updateCurrentTime, 1000);
      // Foco no primeiro botão quando a página carregar
      setTimeout(() => {
        const firstButton = document.querySelector('.time-button');
        if (firstButton) {
          (firstButton as HTMLElement).focus();
        }
      }, 100);
    });

    onUnmounted(() => {
      clearInterval(clockInterval);
    });

    return {
      times,
      formatTime,
      selectTime,
      focusPrevious,
      focusNext,
      focusUp,
      focusDown,
      getCurrentTime,
      goBack
    };
  }
});
</script>

<style scoped>
.timer-grid {
  height: 100vh;
  overflow: hidden;
  background: #000;
  display: flex;
  flex-direction: column;
}

.header-center {
  flex: 0 0 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  position: relative;
}

.header-center .logo {
  height: 30vh;
  object-fit: contain;
}

.current-time {
  position: absolute;
  right: 2vw;
  top: 2vh;
  font-size: min(4vh, 4vw);
  color: white;
  text-shadow: 0 0 10px rgba(255,255,255,0.3);
}

.grid-container {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2vh;
  width: 85vw;
  margin: 2vh auto;
  align-content: center;
}

.time-button {
  background: transparent;
  border: 4px solid rgba(255, 255, 255, 0.8);
  border-radius: 0.3vh;
  color: white;
  font-size: min(2.8vh, 2.8vw);
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 2/1;
  padding: 0.8vh;
  position: relative;
  z-index: 1;
}

.time-button:hover,
.time-button:focus {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.05);
  outline: none;
  border-color: white;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
}

.time-button:focus {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(1.1);
  outline: none;
  border-color: #fff;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.4);
  z-index: 2;
}

.time-button:focus::after {
  content: '';
  position: absolute;
  inset: -6px;
  border: 3px solid white;
  border-radius: 0.4vh;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
</style>
