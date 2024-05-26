<template>
  <div
    ref="parentDiv"
    class="bg-white absolute w-48 rounded-md shadow-lg z-40"
    :class="{
      parent: !willOverflow,
      'parent-reverse': willOverflow,
    }"
  >
    <div
      v-for="(value, index) in actionData"
      :key="index"
      class="actions text-title cursor-pointer gap-3 py-3 px-4 hover:text-white p-2 transition-all duration-300"
      :class="{
        'rounded-t-md': index === 0,
        'rounded-b-md': actionData.length - 1 === index,
      }"
      @click="handlerAction(value)"
    >
      <span class="text-sm">{{ value[0].toUpperCase() + value.slice(1) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableActions',
  props: {
    data: {
      type: [Object, Array, String, Number],
      default() {
        return null;
      }
    },
    detailValidation: {
      type: Boolean,
      default() {
        return true;
      }
    },
    deleteValidation: {
      type: Boolean,
      default() {
        return true;
      }
    },
    editValidation: {
      type: Boolean,
      default() {
        return true;
      }
    },
    actionEdit: {
      type: Function,
      default() {
        return () => ({});
      }
    },
    actionDetail: {
      type: Function,
      default() {
        return () => ({});
      }
    },
    actionDelete: {
      type: Function,
      default() {
        return () => ({});
      }
    },
    withCustom: {
      type: Boolean,
      default() {
        return true;
      }
    },
    actionCustom: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      willOverflow: false,
      actionData: []
    };
  },
  mounted() {
    this.initActions();
    this.determineOverflow();
  },
  methods: {
    determineOverflow() {
      const element = this.$refs.parentDiv;
      const parentTable = element.closest('.table-body');
      this.willOverflow =
        parentTable.getBoundingClientRect().bottom - 110 <
        element.getBoundingClientRect().bottom;
    },
    initActions() {
      if (this.actionDetail.toString() !== '() => ({})' && this.detailValidation) {
        this.actionData = [ ...this.actionData, 'details' ];
      }

      if (this.actionEdit.toString() !== '() => ({})' && this.editValidation) {
        this.actionData = [ ...this.actionData, 'edit' ];
      }

      if (this.actionDelete.toString() !== '() => ({})' && this.deleteValidation) {
        this.actionData = [ ...this.actionData, 'delete'] ;
      }

      if (this.withCustom && this.actionCustom.length > 0) {
        this.actionCustom.forEach(element => {
          this.actionData = [ ...this.actionData, element.name] ;
        });
      }
    },
    handlerAction(type) {
      if (this.withCustom && this.actionCustom.length > 0) {
        this.actionCustom.forEach(element => {
          type === element.name && element.action(this.data);
        });
      }else{
        switch (type) {
          case 'edit':
            this.actionEdit(this.data);
            break;

          case 'delete':
            this.actionDelete(this.data);
            break;

          case 'details':
          default:
            this.actionDetail(this.data);
            break;
        }
      }
    }
  }
};
</script>

<style scoped>
.parent {
  transform: translateX(-113%);
}
.parent-reverse {
  transform: translate(-115%, -100%);
}
.actions:hover {
  background-color: #000000 !important;
}
</style>
