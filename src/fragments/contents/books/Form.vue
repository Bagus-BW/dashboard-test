<template>
  <div class="grid grid-cols-1">
    <div class="flex flex-col gap-4">
      <FormTextField
        v-model="form.title"
        name="title"
        label="Title"
        placeholder="Title book"
        required
        :error="errorNotice.title"
      />
      <FormSelect 
        v-model="form.category"
        :lists="categories"
        name="category"
        label="Category"
        required
        :error="errorNotice.category"
      />
      <FormSelect 
        v-model="form.status"
        :lists="status"
        name="status"
        label="Status"
        required
        :error="errorNotice.status"
      />
    </div>
  </div>
  <div class="flex justify-end gap-3">
    <MiscButton
      text="Discard"
      border-only
      @click-handle="handleDiscard"
    />
    <MiscButton
      primary-color="#000000"
      background-color="#000000"
      text-color="#FFFFFF"
      :text="formType !== 'edit' ? 'Create' : 'Save'"
      @click-handle="validateForm"
    />
  </div>
</template>
<script>
import { startCase } from 'lodash-es';

export default {
  data() {
    return {
      form: {
        title: "",
        category: "",
        status: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      tempForm: {},
      errorNotice: {
        title: "",
        category: "",
        status: ""
      },
      categories: [
        {
          label: "Information Technology",
          value: "Information Technology"
        },
        {
          label: "Fantasy",
          value: "Fantasy"
        },
        {
          label: "Science fiction",
          value: "Science fiction"
        },
        {
          label: "Biography",
          value: "Biography"
        },
        {
          label: "Romance",
          value: "Romance"
        },
        {
          label: "History",
          value: "History"
        },
      ],
      status: [
        {
          label: "Publish",
          value: "Publish"
        },
        {
          label: "Review",
          value: "Review"
        },
        {
          label: "Draft",
          value: "Draft"
        },
      ]
    }
  },
  computed: {
    formType() {
      const type = this.$route.fullPath.split("/")
      return type[type.length - 2];
    }
  },
  mounted() {
    if(this.formType === "edit") {
      const id = this.$route.params.id
      const books = JSON.parse(localStorage.getItem('books')) || [];
      if(books) {
        const findIndex = books.findIndex(book => book.id === Number(id));
        if (findIndex !== -1) {
          this.form = {
            ...books[findIndex]
          }
          this.tempForm = {...this.form}
        }
      }
    }
  },
  methods: {
    handleDiscard() {
      if(this.formType !== "edit") {
        this.form = {
          title: "",
          category: "",
          status: ""
        }
      }else{
        this.form = {
          ...this.tempForm
        }
      }
    },
    validateForm() {
      // clear error data
      let errorCount = 0;
      Object.keys(this.errorNotice).map(
        errorNode => (this.errorNotice[errorNode] = '')
      );

      const validateColumn = [
        'title', 
        'category',
        'status'
      ];

      validateColumn.map(node => {
        if (!this.form[node]) {
          errorCount++;
          this.errorNotice[node] = `${startCase(node)} is required`;
        }
      });

      if (errorCount === 0) {
        this.submitForm();
      }
    },
    submitForm() {
      const books = JSON.parse(localStorage.getItem('books')) || [];
      if(this.formType !== "edit") {
        const newId = books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
        const newBooks = [
          ...books,
          {
            id: newId,
            ...this.form
          }
        ];
  
        localStorage.setItem('books', JSON.stringify(newBooks));
      }else{
        const editedBooks = books.map(book => 
          book.id === this.form.id ? { ...book, ...this.form } : book
        );
        localStorage.setItem('books', JSON.stringify(editedBooks));
      }

      this.$router.push('/books');
    }
  }
}
</script>