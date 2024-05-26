<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="6.66675"
      y="2.5"
      width="2.66667"
      height="12"
      rx="1.33333"
      :fill="color"
    />
    <rect
      opacity="0.6"
      x="14"
      y="7.16602"
      width="2.66667"
      height="12"
      rx="1.33333"
      transform="rotate(90 14 7.16602)"
      :fill="color"
    />
  </svg>
</template>
  
<script>
export default {
  props: {
    color: {
      type: String,
      default: function () {
        return '#DA4A4A';
      }
    },
    size: {
      type: String,
      default () {
        return '22';
      }
    },
  }
};
</script>
  