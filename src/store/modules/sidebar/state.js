export default () => ({
  open: null,
  menuList: [
    {
      url: '/',
      name: 'Dashboard',
      iconPack: 'image',
      icon: '/img/icon/dashboard.png',
      iconActive: '/img/icon/dashboard-active.png',
      slug: ''
    },
    {
      header: 'Content',
      items: [
        {
          url: '/books',
          name: 'Books',
          iconPack: 'image',
          icon: '/img/icon/book.png',
          iconActive: '/img/icon/book-active.png',
          slug: 'books'
        },
      ]
    }
  ]
});