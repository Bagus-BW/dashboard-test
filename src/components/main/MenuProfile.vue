<template>
  <div class="flex items-center">
    <div
      v-click-outside="closeModal"
      class="cursor-pointer"
      @click="showDropdown = !showDropdown"
    >
      <div class="flex items-center gap-3">
        <div class="text-right text-black leading-tight hidden sm:block">
          <p class="font-semibold">
            Jhone Doe
          </p>
          <small>Admin</small>
        </div>
        <div class="rounded-full overflow-hidden cursor-pointer shadow-md">
          <img
            :src="`/img/icon/user.png`"
            alt="user-img"
            width="40"
            height="40"
            class="h-12 w-12 object-cover object-top"
          >
        </div>
      </div>
    </div>
    <Transition name="slide-down">
      <div
        v-if="showDropdown === true"
        class="absolute top-28 pr-2 right-5 z-50 mt-1"
      >
        <ul
          style="min-width: 9rem"
          class="bg-white backdrop-blur-sm shadow-lg rounded-md"
        >
          <li
            class="flex items-center py-3 px-4 cursor-pointer hovered-menu hover:rounded-b-md group"
            @click="logout"
          >
            <SvgLogout
              height="16"
              width="16"
              class="group-hover:stroke-white"
              color="black"
            />
            <span class="ml-2 group-hover:text-white">Logout</span>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  data(){
    return {
      showDropdown: false
    };
  },
  computed: {
    styling() {
      return this.$store.root.getPallets;
    }
  },
  methods: {
    async logout(){
      return;

    },
    closeModal(){
      this.showDropdown = false;
    }
  }
};
</script>

<style lang="postcss">
.hovered-menu:hover{
  background: #000000;
}
</style>