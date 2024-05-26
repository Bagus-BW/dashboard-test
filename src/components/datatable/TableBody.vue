<template>
  <table class="table-body w-full table-auto">
    <thead class="bg-slate-200 text-left">
      <tr
        v-if="!tableExpand"
        class="whitespace-nowrap uppercase"
      >
        <th class="text-base text-spacecadet-100 font-medium p-3">
          #
        </th>
        <th
          v-for="(header, index) in headers"
          :key="index"
          class="text-base text-spacecadet-100 font-medium p-3"
        >
          {{ header.displayName }}
        </th>
        <th 
          v-if="withActions"
          class="text-base text-spacecadet-100 font-medium px-4 py-1 text-center"
        >
          <slot
            v-if="$slots.actionsLabel"
            name="actionsLabel"
          />
          <span v-else>
            Actions
          </span>
        </th>
      </tr>
      <tr v-if="tableExpand">
        <th 
          class="grid items-center w-full text-left uppercase"
          :style="{
            'grid-template-area': `index ${headers.map(header => header.column).join(' ')} more`,
            'grid-template-columns': `40px repeat(${headers.length}, 1fr) 100px`,
          }"
        >
          <p 
            class="text-base text-spacecadet-100 font-medium p-3 ro"
          >
            #
          </p>
          <div
            v-for="(header, index) in headers"
            :key="index"
            class="flex w-full text-base text-spacecadet-100 font-medium"
          >
            <p>{{ header.displayName }}</p>
          </div>
          <div class="text-base text-spacecadet-100 font-medium px-4 py-1 text-center">
            MORE
          </div>
        </th>
      </tr>
    </thead>
    <tbody v-if="dataList.length > 0 && !tableExpand">
      <tr
        v-for="(data, idx) in dataList"
        :key="idx"
        class="border-b border-cutured-primary px-4 hover:border-b-[5px] hover:bg-gray-200 group w-4 z-0 transition duration-300"
      >
        <td 
          class="text-base text-spacecadet-100 font-light p-3 cursor-default transition duration-200 transform group-hover:-translate-y-1"
        >
          <slot
            v-if="$slots[`index`]"
            name="index"
            :data="data"
          />
          <span v-else>
            {{ formatNumber(idx) }}
          </span>
        </td>
        <td
          v-for="(header, idy) in headers"
          :key="idy"
          class="text-base text-spacecadet-100 font-light p-3 cursor-default transition duration-200 transform group-hover:-translate-y-1"
        >
          <slot
            v-if="$slots[`cell(${header.column})`]"
            :name="`cell(${header.column})`"
            :data="data"
            :column="data[header.column]"
          />
          <p v-else>
            {{ data[header.column] || '-' }}
          </p>
        </td>
        <td
          v-if="withActions"
          v-click-outside="closeToggle"
          class="flex justify-center transition duration-200 px-2 py-1"
        >
          <slot
            v-if="$slots[`actions`]"
            name="actions"
            :data="data"
          />
          <div
            v-else
            class="flex justify-center items-center cursor-pointer action-class w-fit"
            @click="actionToggle(idx)"
          >
            <SvgOption class="prevent-class" />
            <transition name="bounce">
              <div
                v-if="openedAction === idx"
                class="text-left"
              >
                <TableActions
                  :data="data"
                  :detail-validation="validateButton('detail', data)"
                  :delete-validation="validateButton('delete', data)"
                  :edit-validation="validateButton('edit', data)"
                  :action-detail="actionDetail"
                  :action-delete="actionDelete"
                  :action-edit="actionEdit"
                  :with-custom="withCustoms"
                  :action-custom="actionCustom"
                />
              </div>
            </transition>
          </div>
        </td>
      </tr>
    </tbody>
    <tbody v-if="dataList.length > 0 && tableExpand">
      <tr
        v-for="(data, idx) in dataList"
        :key="idx"
        class="border-b hover:bg-gray-200 group w-4 z-0 transition duration-300 cursor-pointer"
        @click="actionToggle(idx)"
      >
        <td
          class="p-0"
        >
          <div
            class="grid items-center w-full text-leftm transition duration-200 transform group-hover:-translate-y-1"
            :style="{
              'grid-template-area': `index ${headers.map(header => header.column).join(' ')} more`,
              'grid-template-columns': `40px repeat(${headers.length}, 1fr) 100px`,
            }"
          >
            <div 
              class="text-base text-spacecadet-100 font-light p-3 cursor-default"
            >
              <slot
                v-if="$slots[`index`]"
                name="index"
                :data="data"
              />
              <span v-else>
                {{ formatNumber(idx) }}
              </span>
            </div>
            <div
              v-for="(header, idy) in headers"
              :key="idy"
              class="flex w-full"
            >
              <slot
                v-if="$slots[`cell(${header.column})`]"
                :name="`cell(${header.column})`"
                :data="data"
                :column="data[header.column]"
              />
              <p v-else>
                {{ data[header.column] || '-' }}
              </p>
            </div>
            <div
              class="flex justify-center transition duration-200 px-2 py-1"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                :transform="openedAction === idx ? 'rotate(360)' : 'rotate(270)'"
              >
                <path d="M10 12l-6-6 1.41-1.41L10 9.17l4.59-4.58L16 6l-6 6z" />
              </svg>
            </div>
          </div>
          <div 
            class="w-full text-spacecadet-100 bg-[#F9F9F9]"
            :class="{
              'slidedown': openedAction === idx,
              'slideup': openedAction !== idx,
            }"
          >
            <slot
              name="body-expand"
              :data="data"
            />
          </div>
        </td>
      </tr>
    </tbody>
    <tbody v-if="dataList.length < 1">
      <tr>
        <td
          colspan="100%" 
          class="w-full text-center p-3"
        >
          <span>Data is empty</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: 'TableBody',
  props: {
    pagination: {
      type: Object,
      required: true
    },
    headers: {
      type: Array,
      required: true
    },
    dataList: {
      type: [Array, Object],
      required: true,
      default() {
        return [];
      }
    },
    withActions: {
      type: Boolean,
      default() {
        return false;
      }
    },
    detailValidation: {
      type: Function,
      default: () => ({})
    },
    deleteValidation: {
      type: Function,
      default: () => ({})
    },
    editValidation: {
      type: Function,
      default: () => ({})
    },
    actionDetail: {
      type: Function,
      default: () => ({})
    },
    actionDelete: {
      type: Function,
      default: () => ({})
    },
    actionEdit: {
      type: Function,
      default: () => ({})
    },
    withCustoms: {
      type: Boolean,
      default() {
        return false;
      }
    },
    actionCustom: {
      type: Array,
      default() {
        return [];
      }
    },
    tableExpand: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      openedAction: null
    };
  },
  computed: {
    formatNumber() {
      return idx => idx + 1 + (this.pagination.currentPage - 1) * this.pagination.perPage || idx + 1 + (this.pagination.currentPage - 1) * 10;
    }
  },
  methods: {
    validateButton(mode, rowData) {
      let statuses = true;

      switch (mode) {
        case 'edit':
          statuses =
            ['()=>({})', '() => ({})'].includes(this.editValidation.toString()) === false
              ? (this.editValidation(rowData) || false)
              : true;
          break;

        case 'delete':
          statuses =
            ['()=>({})', '() => ({})'].includes(this.deleteValidation.toString()) === false
              ? (this.deleteValidation(rowData) || false)
              : true;
          break;

        case 'detail':
        default:
          statuses =
            ['()=>({})', '() => ({})'].includes(this.detailValidation.toString()) === false
              ? (this.detailValidation(rowData) || false)
              : true;
          break;
      }

      return statuses;
    },
    actionToggle(rowNode) {
      this.openedAction = this.openedAction === rowNode ? null : rowNode;
    },
    closeToggle(element) {
      const status =
        element !== undefined && element.composedPath()
          ? element
              .composedPath()
              .some((className) =>
                /prevent-class/.test(className.classList)
              )
          : false;

      if(!status) {
        this.openedAction = null;
      }
    }
  }
};
</script>