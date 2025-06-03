import { createStore } from 'vuex';

interface State {
  currentTime: number;
  selectedTime: number;
}

export default createStore<State>({
  state: {
    currentTime: Number(localStorage.getItem('currentTime')) || 0,
    selectedTime: Number(localStorage.getItem('selectedTime')) || 0
  },
  mutations: {
    setSelectedTime(state, time: number) {
      state.selectedTime = time;
      state.currentTime = time;
      localStorage.setItem('selectedTime', time.toString());
      localStorage.setItem('currentTime', time.toString());
    },
    decrementTime(state) {
      if (state.currentTime > 0) {
        state.currentTime--;
        localStorage.setItem('currentTime', state.currentTime.toString());
      }
    },
    resetToSelectedTime(state) {
      state.currentTime = state.selectedTime;
      localStorage.setItem('currentTime', state.currentTime.toString());
    }
  }
});