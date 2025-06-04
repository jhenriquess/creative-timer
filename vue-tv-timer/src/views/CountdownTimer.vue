<template>
  <div class="main-container" @keydown.escape="goBack">
    <header class="header">
      <div class="current-time">{{ getCurrentTime }}</div>
      <div class="header-center">
        <img src="/logo.png" alt="Logo" class="logo" />
      </div>
    </header>

    <main class="timer-section">
      <div class="timer-display">{{ formatTime }}</div>
      <div class="controls">
        <div v-if="!isFinished">
          <button class="control-button" @click="toggleTimer">
            <span v-if="isRunning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M5.5 0v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5zm5 0v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5z"
                />
              </svg>
            </span>
            <span v-else>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
              </svg>
            </span>
          </button>
          <button
            class="sound-toggle"
            @click="toggleSound"
            :aria-label="soundOn ? 'Desativar som' : 'Ativar som'"
          >
            <span v-if="soundOn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"
                />
                <path
                  d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"
                />
                <path
                  d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"
                />
              </svg>
            </span>
            <span v-else>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"
                />
              </svg>
            </span>
          </button>
        </div>
        <div v-else>
          <button class="control-button" @click="resetTimer">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
              <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
            </svg>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'CountdownTimer',
  setup() {    const store = useStore();
    const router = useRouter();
    const isRunning = ref(false);
    const isFinished = ref(false);
    const soundOn = ref(true);
    let timerInterval: number;
    const audio = new Audio('/fimTreino.wav');
    const startSound = new Audio('/inicioTreino.wav');

    const formatTime = computed(() => {
      const time = store.state.currentTime;
      if (time <= 0) {
        isFinished.value = true;
        isRunning.value = false;
        clearInterval(timerInterval);
        if (soundOn.value) {
          audio.play().catch((error) => console.log('Erro ao tocar áudio:', error));
        }
        return '00:00';
      }
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    });    const toggleTimer = () => {
      isRunning.value = !isRunning.value;
      if (isRunning.value) {
        if (soundOn.value) {
          startSound.play().catch((error) => console.log('Erro ao tocar áudio:', error));
        }
        timerInterval = setInterval(() => {
          store.commit('decrementTime');
        }, 1000);
      } else {
        clearInterval(timerInterval);
      }
    };

    const resetTimer = () => {
      store.commit('resetToSelectedTime');
      isFinished.value = false;
      isRunning.value = false;
      audio.pause();
      audio.currentTime = 0;
    };

    const toggleSound = () => {
      soundOn.value = !soundOn.value;
    };

    const goBack = () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
      router.push('/timer-grid');
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
    });

    onUnmounted(() => {
      clearInterval(clockInterval);
    });

    return {
      formatTime,
      isRunning,
      isFinished,
      toggleTimer,
      resetTimer,
      soundOn,
      toggleSound,
      goBack,
      getCurrentTime
    };
  }
});
</script>

<style scoped>
.main-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #000;
  display: flex;
  flex-direction: column;
}

.header {
  flex: 0 0 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  width: 100%;
  box-sizing: border-box;
  position: relative;
}

.logo {
  height: 30vh;
  max-width: 90vw;
  object-fit: contain;
  display: block;
}

.timer-section {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4vh;
  min-height: 0;
  width: 100%;
  box-sizing: border-box;
}

.timer-display {
  font-size: min(40vh, 40vw);
  font-weight: bold;
  line-height: 1;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  width: 100%;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
}

.control-button {
  font-size: min(8vh, 8vw);
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  margin: 0;
  transition: transform 0.3s;
  max-width: 100%;
  overflow: hidden;
}

.control-button:focus,
.control-button:hover {
  transform: scale(1.1);
  outline: none;
}

.controls {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.controls > div {
  display: flex;
  gap: 4vw;
  align-items: center;
}

.sound-toggle {
  background: none;
  border: none;
  color: white;
  font-size: min(6vh, 6vw);
  cursor: pointer;
  margin: 0;
  transition: transform 0.2s;
  max-width: 100%;
  overflow: hidden;
}

.sound-toggle:focus,
.sound-toggle:hover {
  transform: scale(1.2);
  outline: none;
}

.control-button svg,
.sound-toggle svg {
  width: 1em;
  height: 1em;
  display: block;
}

.header-center {
  position: relative;
}

.current-time {
  position: absolute;
  right: 3vw;
  top: 3vh;
  font-size: min(4vh, 4vw);
  color: white;
  text-shadow: 0 0 10px rgba(255,255,255,0.3);
  z-index: 2;
}
</style>
