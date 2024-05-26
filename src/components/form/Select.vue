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
        <slot name="label-legend" />
      </label>
      <select 
        :id="id"
        :value="selected"
        class="border rounded-md p-3"
        :class="{
          'border-black': !error,
          'border-red-500': error,
        }"
        @change="handleChangeSelectedValue"
      >
        <option>--Choose Option--</option>
        <option 
          v-for="(data, idx) in lists" 
          :value="data.value"
        >
          {{ data.label }}
        </option>
      </select>
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
        return '--Choose Option--';
      }
    },
    lists: {
      type: Object,
      default() {
        return []
      },
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
    required: {
      type: Boolean,
      default() {
        return false;
      }
    },
    disabled: {
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
    },
  },
  data() {
    return {
      selected: this.modelValue || "--Choose Option--"
    };
  },
  watch: {
    modelValue(newval) {
      this.selected = newval;
    },
    selected(val) {
      this.$emit('update:modelValue', val);
    }
  },
  methods: {
    handleChangeSelectedValue($event) {
      this.selected=$event.target.value
    }
  }
}
</script>