<template>
  <div class="rounded-lg bg-white shadow-global overflow-x-auto">
    <slot name="header" />
    <div class="relative">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'TableWrapper',
};
</script>