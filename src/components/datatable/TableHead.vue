<template>
  <div class="flex justify-between items-center my-2 p-3">
    <div class="flex items-center gap-2 lg:gap-6">
      <h4 class="text-title font-medium text-xl">
        {{ tableTitle }}
      </h4>
    </div>
    <div
      v-if="$slots.button"
      class="flex items-center justify-center"
    >
      <slot name="button" />
    </div>
    <div
      v-else
      class="flex items-center justify-center"
    >
      <MiscButton 
        v-if="showButton"
        :text="buttonTitle"
        background-color="#000000"
        @click="buttonHandler"
      >
        <template #iconButton>
          <SvgPlus color="#FFFFFF" />
        </template>
      </MiscButton>
    </div>
  </div>
</template>
  
<script>
import { isEqual } from 'lodash-es';

export default {
  name: 'TableHead',
  props: {
    modelValue: {
      type: Object,
      default() {
        return {};
      }
    },
    tableTitle: {
      type: String,
      default() {
        return '';
      }
    },
    buttonTitle: {
      type: String,
      default() {
        return '';
      }
    },
    showButton: {
      type: Boolean,
      default() {
        return false;
      }
    },
    buttonHandler: {
      type: Function,
      default() {
        return () => {};
      }
    },
    customFilter: {
      type: Array,
      default() {
        return [];
      }
    },
    buttonShowFilter: {
      type: Boolean,
      default() {
        return true;
      }
    },
    buttonShowSearch: {
      type: Boolean,
      default() {
        return true;
      }
    },
    withQueryRoute: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      showFilter: false,
      showSearch: false,
      filter: {
        ...this.modelValue
      }
    };
  },
  computed: {
    styling() {
      return this.$store.root.getPallets;
    }
  },
  watch: {
    modelValue(newVal) {
      this.filter = {
        ...this.filter,
        ...newVal
      };
    },
    filter(newVal, oldVal) {
      if(!isEqual(newVal, oldVal)) {
        this.$emit('update:modelValue', newVal);
      }
    }
  },
  mounted() {
    if(this.$route.query.keyword) {
      this.showSearch = true;
    }
  }
};
</script>  