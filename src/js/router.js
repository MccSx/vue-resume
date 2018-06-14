//const Page = { template: '<div>foo</div>' }


const routes = [
  { path: '/', component: window.Page },
  { path: '/login', component: window.Login },
  { path: '/signUp', component: window.SignUp }
]

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

const app = new Vue({
  router,
  el:'#app'
})
