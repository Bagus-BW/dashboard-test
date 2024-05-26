<template>
  <div class="flex flex-col lg:flex-row items-center gap-4 justify-between px-3 py-4">
    <div class="flex gap-1 items-center text-black">
      <p class="text-base text-spacecadet-40">
        Showing {{ numberFrom }} to {{ numberTo }} from
        {{ pagination.totalData }} entries
      </p>
    </div>
    <div class="flex gap-1">
      <button
        type="button"
        class="flex items-center justify-center w-[60px] bg-[#00000030] rounded-full border-0"
        :class="{
          'cursor-not-allowed': pagination.currentPage === 1,
          'active-rounded': pagination.currentPage !== 1,
        }"
        @click="prevPage"
      >
        <SvgArrow color="#000000" size="15" />
      </button>
      <div
        id="rangenumber"
        class="flex items-center justify-center lg:w-full rounded-full h-9 gap-5 px-4 text-sm lg:text-base"
        :style="{
          'color': '#000000',
          'background-color': '#00000030'
        }"
      >
        <ul
          v-for="(number, index) in pagination.rangenumber"
          :key="index"
          class="cursor-pointer"
          @click="changePage(number)"
        >
          <li
            v-if="typeof number === 'number'"
            class="flex items-center justify-center"
            :class="{
              'active': number == pagination.currentPage || number === 1 && !pagination.currentPage,
            }"
          >
            {{ number }}
          </li>
          <li
            v-else
            class="flex items-center justify-center"
          >
            ...
          </li>
        </ul>
      </div>
      <button
        type="button"
        class="flex items-center justify-center w-[60px] bg-[#00000030] rounded-full border-0"
        :class="{
          'cursor-not-allowed': pagination.currentPage <= pagination.totalPage,
          'active-rounded': pagination.currentPage !== pagination.totalPage,
        }"
        @click="nextPage"
      >
        <SvgArrow color="#000000" size="15" class="rotate-180" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableFooter',
  props: {
    modelValue: {
      type: Object,
      default() {
        return {};
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
      pagination: this.modelValue || {
        currentPage: 1,
        perPage: 10,
        totalPage: 1,
        totalData: 1,
        rangenumber: []
      }
    };
  },
  computed: {
    styling() {
      return this.$store.root.getPallets;
    },
    numberFrom() {
      return (this.pagination.currentPage * this.pagination.perPage ) - this.pagination.perPage + 1;
    },
    numberTo() {
      let number = this.pagination.currentPage * this.pagination.perPage;
      if((this.pagination.currentPage === this.pagination.totalPage) && (number > this.pagination.totalData)){
        number = this.pagination.totalData;
      }
      return number;
    }
  },
  watch: {
    modelValue: {
      handler(newval) {
        if(Object.keys(this.$route.query).length){
          this.pagination = {
            ...newval,
            currentPage: newval.currentPage
          };
        }else{
          this.pagination = {
            ...newval
          };
        }

        this.generateRange();
      },
      deep: true
    }
  },
  mounted() {
    this.generateRange();

    if(Object.keys(this.$route.query).length){
      this.pagination.currentPage = parseInt(this.$route.query.page);
    }
  },
  methods: {
    prevPage() {
      if (this.pagination.currentPage > 1) {
        this.pagination.currentPage -= 1;
        this.generateRange();
        this.updateQueryRoute(this.pagination.currentPage);
        this.$emit('update:modelValue', this.pagination);
      }
    },
    nextPage() {
      if (this.pagination.currentPage < this.pagination.totalPage) {
        this.pagination.currentPage += 1;
        this.generateRange();
        this.updateQueryRoute(this.pagination.currentPage);
        this.$emit('update:modelValue', this.pagination);
      }
    },
    generateRange() {
      let range = [];
      let currentPage = this.pagination.currentPage;
      let totalPages = this.pagination.totalPage;
      for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
          range.push(i);
        } else if (i === currentPage - 3 || i === currentPage + 3) {
          range.push("...");
        }
      }
      this.pagination.rangenumber = range;
    },
    changePage(number) {
      if (number !== '...') {
        this.updateQueryRoute(number);
        this.pagination.currentPage = number;
        this.generateRange();
        this.$emit('update:modelValue', this.pagination);
      }
    },
    updateQueryRoute(page) {
      if(this.withQueryRoute){
        this.$router.push({
          query: {
            ...this.$route.query,
            page: page
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.active {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color:  #000000;
  color: white;
}
.active-rounded:hover{
  background-color: #000000 !important;
}
</style>