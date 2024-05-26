import { defineStore, acceptHMRUpdate } from 'pinia';
import state from './state';
import getters from './getters';

const useSidebar = defineStore('sidebar', {
  // arrow function recommended for full type inference
  state: state,
  getters: getters
});

// make sure to pass the right store definition, `useRoot` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSidebar, import.meta.hot));
}

export default useSidebar;
