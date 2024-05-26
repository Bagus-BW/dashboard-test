<template>
  <div class="min-h-screen">
    <component :is="layout">
      <router-view :key="$route.fullPath" />
    </component>
  </div>
</template>

<script>
import mainLayout from '@/layouts/Main.vue';
export default {
  name: "App",
  computed: {
   layout () {
    return mainLayout
   } 
  },
  created() {
    window.addEventListener('resize', this.handleWindowResize);
    this.handleWindowResize();
  },
  unmounted() {
    window.removeEventListener('resize', this.handleWindowResize);
  },
  methods: {
    handleWindowResize() {
      this.$store.root.windowWidth = window.innerWidth;
    },
  }
}

</script>
