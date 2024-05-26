<template>
  <div class="flex flex-col">
    <div class="flex flex-col gap-y-1.5">
      <label
        class="flex justify-between text-black text-xs gap-1"
        :for="id"
      >
        <span>
          {{ label }}
          <span
            v-if="required"
            class="text-red-500"
          > * </span>
        </span>
      </label>
      <div
        class="flex items-center border border-solid rounded-md"
        :class="[
          {
            'border-black': !error,
            'border-red-500': error,
          }
        ]"
      >
        <input
          :id="id"
          v-model="inputVal"
          class="w-full text-sm text-black border-0 border-solid px-2 pr-3 py-[12px] placeholder-black rounded-md"
          :type="inputType"
          :placeholder="placeholder"
        >
      </div>
    </div>
    <small
      v-if="error"
      class="text-xs text-red-500"
    >
      {{ error }}
    </small>
  </div>
</template>
  
<script>
import { random } from 'lodash-es';

export default {
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default() {
        return '';
      }
    },
    inputType: {
      type: String,
      default() {
        return 'text';
      }
    },
    id: {
      type: String,
      default() {
        return 'input-' + random(1, 100);
      }
    },
    label: {
      type: String,
      default() {
        return '';
      }
    },
    placeholder: {
      type: String,
      default() {
        return '';
      }
    },
    required: {
      type: Boolean,
      default() {
        return false;
      }
    },
    error: {
      type: String,
      default() {
        return '';
      }
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      inputVal: this.modelValue || null
    };
  },
  watch: {
    modelValue(newval) {
      this.inputVal = newval;
    },
    inputVal(val) {
      this.$emit('update:modelValue', val);
    }
  }
};
</script>