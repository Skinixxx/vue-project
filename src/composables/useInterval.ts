import { ref, onUnmounted } from 'vue';

export default function useInterval(callback: () => void, interval: number) {
  const intervalId = ref<number | null>(null);
  const isActive = ref(false);

  const start = () => {
    if (isActive.value) return;
    isActive.value = true;
    intervalId.value = window.setInterval(callback, interval);
  };

  const stop = () => {
    if (!isActive.value || intervalId.value === null) return;
    isActive.value = false;
    clearInterval(intervalId.value);
    intervalId.value = null;
  };

  onUnmounted(stop);

  return {
    start,
    stop,
    isActive
  };
}