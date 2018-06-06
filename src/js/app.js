var vm = new Vue({
  el: '#app',
  data: {
    resume: {
      name: '姓名',
      jobTitle: '前端工程师',
      birthday: '1990.1.1',
      email: 'xxx@163.com',
      gender: '男',
      phone: '12312341234'
    }
  },
  methods: {
    edit(key, value) {
      this.resume[key] = value
    }
  }
})