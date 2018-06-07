let vm = new Vue({
  el: '#app',
  data: {
    loginVisible: false,
    signUpVisible: false,
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
    },
    onClickSave() {
      let currentUser = AV.User.current();
      if (currentUser) {
         // 跳转到首页
      }
      else {
        this.loginVisible = true
      }
    }
  }
})