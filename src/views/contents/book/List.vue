<template>
  <div class="relative">
    <TableWrapper :is-loading="false">
      <template #header>
        <TableHead
          class="px-4"
          table-title="Book List"
          button-title="Create Book"
          :button-handler="btnCreate"
          with-query-route
          show-button
        />
      </template>
      <TableBody
        :pagination="pagination"
        :headers="tableHead"
        :data-list="list"
        :action-edit="$event => btnEdit($event.id)"  
        :action-delete="$event => btnDelete($event.id)"
        :detailValidation="() => false"
        with-actions
      >
        <template #cell(updated_at)="{ column }">
          <p>{{ new Date(column).toLocaleDateString("id-ID", {year: "numeric", month: "long", day:"numeric", hour: "2-digit", minute: "2-digit"}) }}</p>
        </template>
      </TableBody>
      <TableFooter
        v-model="pagination"
        with-query-route
        class="px-4"
      />
    </TableWrapper>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableHead: [
        {
          column: 'title',
          displayName: 'Title'
        },
        {
          column: 'category',
          displayName: 'Category'
        },
        {
          column: 'status',
          displayName: 'Status'
        },
        {
          column: 'updated_at',
          displayName: 'Last Update'
        }
      ],
      list: JSON.parse(localStorage.getItem('books')) || [],
      pagination: {
        currentPage: 1,
        totalPage: 1,
        perPage: 10,
        totalData: 10,
        search: null,
        sortBy: null,
        order_by: ''
      },
    }
  },
  methods: {
    btnCreate() {
      this.$router.push("/books/create");
    },
    btnEdit(id) {
      this.$router.push(`/books/edit/${id}`)
    },
    btnDelete(id) {
      const books = JSON.parse(localStorage.getItem('books'))
      if(books) {
        const findIndex = books.findIndex(book => book.id === id);
        if (findIndex !== -1) {
          books.splice(findIndex, 1);
          localStorage.setItem('books', JSON.stringify(books));

          this.list = books
        }
      }

    }
  }
}
</script>