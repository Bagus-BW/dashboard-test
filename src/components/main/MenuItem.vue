<template>
  <div
    class="text-base font-medium rounded-md menu-default transition-all duration-300"
    :class="[
      { 'menu-active': activeLink },
      { 'cursor-not-allowed opacity-50': isDisabled },
    ]"
  >
    <router-link
      v-if="to"
      tabindex="-1"
      class="flex items-center gap-4 text-black p-3"
      :class="[
        { 'text-white': activeLink },
      ]"
      :to="to"
      :target="target"
    >
      <img
        v-if="iconPack === 'image'"
        class="w-5 h-5 object-center"
        :src="activeLink ? icon.active : icon.default"
      >
      <slot />
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    icon: { 
      type: 
      [Object, String], 
      default: null 
    },
    iconPack: { 
      type: String, 
      default: 'image' 
    },
    to: { 
      type: [String, Object, null], 
      default: null 
    },
    slug: { 
      type: String, 
      default: null 
    },
    target: { 
      type: String, 
      default: '_self' 
    },
    isDisabled: { 
      type: Boolean, 
      default: false 
    }
  },
  computed: {
    activeLink() {
      return this.$router.currentRoute.value.path.split('/').pop() === this.slug
    }
  }
};
</script>

<style lang="postcss" scoped>
.menu-active {
  background: linear-gradient(118deg,rgba(0,0,0,1),rgba(0,0,0,.7))!important;
}
.menu-default:hover {
  margin-left: 5px;
  background-color: rgba(0,0,0, 0.2);
}
</style>