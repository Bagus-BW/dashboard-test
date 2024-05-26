<template>
  <div>
    <div
      class="fixed z-50 shadow-lg transition-all duration-300 group h-full"
      :class="{
        '-left-80': isSmallDevice,
        '!left-0': isSmallDevice && getSidebarStatus,
        'w-[80px] hover:w-[19rem]': !getSidebarStatus,
        'w-[19rem]': getSidebarStatus
      }"
    >
      <div class="bg-white">
        <div class="flex items-center justify-between header-class bg-white w-full overflow-hidden">
          <router-link
            class="cursor-pointer flex items-center"
            to="/"
          >
            <img
              src="/img/icon/logo.png"
              alt="Logo"
              class="mr-2 w-12 h-12 object-scale-down"
            >
            <span
              class="text-black font-semibold group-hover:opacity-100 transition-all duration-300"
              :class="{
                'opacity-0': !getSidebarStatus,
                'group-hover:break-all': getMeta?.title?.length === 15,
                'overflow-break-words': getSidebarStatus,
                'break-all': getMeta?.title?.length === 15,
              }"
            >
              Bookly
            </span>
          </router-link>
          <img 
            v-if="!getSidebarStatus" 
            src="/img/icon/hamburger.png" 
            alt="icon-hamburger" 
            class="w-8 cursor-pointer"
            @click="this.$store.sidebar.open = true"
          >
          <img 
            v-if="getSidebarStatus" 
            src="/img/icon/cross.png" 
            alt="icon-hamburger" 
            class="w-14 cursor-pointer"
            @click="this.$store.sidebar.open = false"
          >
        </div>
        <div class="h-screen bg-white pb-6 px-6 overflow-y-scroll">
          <template v-for="(item, index) in menuItemsUpdated">
            <div
              v-if="item.header"
              :key="`header-${index}`"
              class="text-black px-4 pt-5 pb-2 font-medium group-hover:block truncate uppercase"
              :class="{
                'hidden': !getSidebarStatus
              }"
            >
              {{ item.header }}
            </div>

            <template v-else-if="!item.header">
              <main-menu-item
                v-if="!item.submenu"
                :key="`item-${index}`"
                :index="index"
                :to="item.slug !== 'external' ? item.url : null"
                :href="item.slug === 'external' ? item.url : null"
                :icon-pack="item.iconPack || ''"
                :icon="
                  item.iconPack === 'image'
                    ? { active: item.iconActive, default: item.icon }
                    : item.icon
                "
                :target="item.target"
                :is-disabled="item.isDisabled"
                :slug="item.slug"
              >
                <span
                  class="group-hover:inline"
                  :class="{
                    'hidden': !getSidebarStatus
                  }"
                >{{ item.name }}</span>
              </main-menu-item>
            </template>
          </template>
        </div>
      </div>
    </div>
    <div
      v-show="getSidebarStatus && isSmallDevice"
      aria-hidden="true"
      class="fixed inset-0 transition-opacity bg-black bg-opacity-70 z-40"
    />
  </div>
</template>

<script>
export default {
  props: {
    navMenuItems: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    getSidebarStatus() {
      return this.$store.sidebar.getStatus;
    },
    isSmallDevice() {
      return this.$store.root.windowWidth <= 1024;
    },
    menuItemsUpdated() {
      let activeMenus = [];
      
      this.navMenuItems.map(parent => {
        if (!Object.hasOwnProperty.call(parent, 'items')) {
          activeMenus.push(parent);
        }

        if (Object.hasOwnProperty.call(parent, 'items')) {
          const childData = parent.items
            .map(child => child)

          if (childData.length > 0) {
            activeMenus = [
              ...activeMenus,
              { header: parent.header },
              ...childData
            ];
          }
        }
      });
      return activeMenus;
    }
  },
  watch: {
    isSmallDevice: function(newval) {
      this.$store.sidebar.open = !newval;
    }
  },
  mounted() {
    // only set sidebar status when status is not setted yet
    if (this.getSidebarStatus === null) {
      this.$store.sidebar.open = !this.isSmallDevice;
    }
  }
};
</script>

<style scope>
.header-class {
  padding: 20px 19px 16px 23px;
}
</style>