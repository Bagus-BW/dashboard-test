<template>
  <svg 
    :width="size" 
    :height="size" 
    viewBox="0 0 8 15" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.7 12.8938C8.1 13.2938 8.1 13.8937 7.7 14.2937C7.5 14.4937 7.3 14.5938 7 14.5938C6.7 14.5938 6.5 14.4937 6.3 14.2937L0.3 8.29375C-0.1 7.89375 -0.1 7.29375 0.3 6.89375L6.3 0.89375C6.7 0.49375 7.3 0.49375 7.7 0.89375C8.1 1.29375 8.1 1.89375 7.7 2.29375L2.4 7.59375L7.7 12.8938Z"
      :fill="color"
    />
  </svg>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default() {
        return "#E22126";
      }
    },
    size: {
      type: String,
      default() {
        return "20";
      }
    },
  }
};
</script>
