<template>
  <MainMenuSidebar
    :nav-menu-items="navMenuItems"
    class="h-full min-h-full"
  />
  <div
    id="content-area"
    class="transition-all duration-300"
    :class="{
      'ml-[260px]': !isSmallDevice && sidebarStatus,
      'ml-[80px]': !isSmallDevice && !sidebarStatus
    }"
  >
    <MainHeader />

    <div class="p-8">
      <transition :name="routerTransition">
        <div
          v-if="$route.meta.breadcrumb || $route.meta.pageTitle"
          class="router-header flex flex-wrap items-center mb-6"
        >
          <div
            class="content-area__heading"
            :class="{
              'pr-4 border-0 md:border-r border-solid border-grey-light': $route.meta.breadcrumb
            }"
          >
            <h2 class="text-2xl !font-bold text-black">
              {{ routeTitle }}
            </h2>
          </div>

          <MiscBreadcrumb
            v-if="$route.meta.breadcrumb"
            class="ml-4 md:block hidden"
            :route="$route"
            :is-r-t-l="false"
            :palletes="styling"
          />
        </div>
      </transition>

      <div>
        <router-view v-slot="{ Component, route }">
          <transition :name="routerTransition">
            <component
              :is="Component"
              :key="route.path"
            />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
  </template>
    
<script>
export default {
  data() {
    return {
      navbarColor: '#fff',
      routerTransition: 'fade'
    };
  },
  computed: {
    styling() {
      return this.$store.root.getPallets;
    },
    isSmallDevice() {
      return this.$store.root.windowWidth <= 1024;
    },
    sidebarStatus() {
      return this.$store.sidebar.getStatus;
    },
    navMenuItems() {
      return this.$store.sidebar.getMenuList;
    },
    routeTitle() {
      return this.$route.meta.pageTitle;
    }
  }
};
</script>
    