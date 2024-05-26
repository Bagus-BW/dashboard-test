<template>
  <div class="relative pt-8 px-8">
    <div 
      class="flex flex-wrap items-center shadow-md rounded-md p-4 bg-white"
      :class="{
        'justify-end': !isSmallDevice,
        'justify-between': isSmallDevice
      }"
    >
      <img 
        v-if="isSmallDevice" 
        src="/img/icon/hamburger.png" 
        alt="icon-hamburger" 
        class="w-8 cursor-pointer"
        @click="this.$store.sidebar.open = !this.$store.sidebar.open"
      >
      <main-menu-profile class="inline-flex items-end" />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isSmallDevice() {
      return this.$store.root.windowWidth <= 1024;
    }
  }
};
</script>