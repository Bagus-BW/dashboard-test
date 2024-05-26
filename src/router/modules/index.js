export default [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      breadcrumb: [
        { title: 'Home', url: "/" },
        { title: 'Dashboard', active: true }
      ],
      pageTitle: "Dashboard"
    }
  }
]