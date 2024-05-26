<template>
  <div class="flex">
    <ul class="flex flex-wrap items-center gap-2">
      <li class="inline-flex items-center gap-2">
        <router-link to="/">
          <SvgHome color="#000000" />
        </router-link>
        <span class="mx-2">
          <SvgArrow
            color="#000000"
            size="10"
            class="rotate-180"
          />
        </span>
      </li>
      <li
        v-for="(link, index) in $route.meta.breadcrumb.slice(1, -1)"
        :key="index"
        class="text-black inline-flex items-center gap-2"
      >
        <router-link v-if="link.url" :to="link.url">
          {{ link.title }}
        </router-link>
        <span v-else class="cursor-default">{{ link.title }}</span>
        <span class="mx-2 flex items-start">
          <SvgArrow
            color="#000000"
            size="10"
            class="rotate-180"
          />
        </span>
      </li>
      <li class="inline-flex text-black">
        <span class="cursor-default">{{ $route.meta.breadcrumb.slice(-1)[0].title }}</span>
      </li>
    </ul>
  </div>
</template>