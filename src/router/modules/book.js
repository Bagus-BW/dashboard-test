export default [
  {
    path: '/books',
    name: 'books',
    component: () => import('@/views/contents/book/List.vue'),
    meta: {
      breadcrumb: [
        { title: 'Home', url: "/" },
        { title: 'Books', active: true }
      ],
      pageTitle: "Books"
    }
  },
  {
    path: '/books/create',
    name: 'books-create',
    component: () => import('@/views/contents/book/Manage.vue'),
    meta: {
      breadcrumb: [
        { title: 'Home', url: "/" },
        { title: 'Books', url: "/books" },
        { title: 'Create', active: true }
      ],
      pageTitle: "Books"
    }
  },
  {
    path: '/books/edit/:id',
    name: 'books-edit',
    component: () => import('@/views/contents/book/Manage.vue'),
    meta: {
      breadcrumb: [
        { title: 'Home', url: "/" },
        { title: 'Books', url: "/books" },
        { title: 'Edit', active: true }
      ],
      pageTitle: "Books"
    }
  }
]