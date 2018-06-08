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
    },
    signUp: {
      email: '',
      password: ''
    },
    login: {
      email: '',
      password:''
    }
  },
  methods: {
    edit(key, value) {
      this.resume[key] = value
    },
    onClickSave() {
      let currentUser = AV.User.current();
      if (currentUser) {
        this.saveResume()
      }
      else {
        this.loginVisible = true
      }
    },
    saveResume() {
      let {id} = AV.User.current()
      let user = AV.Object.createWithoutData('User', id)
      user.set('resume', this.resume)
      user.save()
    },
    onSignUp(e){
      let user = new AV.User()
      // 设置用户名
      user.setUsername(this.signUp.email)
      // 设置密码
      user.setPassword(this.signUp.password)
      user.setEmail(this.signUp.email)
      user.signUp().then(function (user) {
          console.log(user)
      }, function (error) {
      })
    },
    onLogin(e){
      AV.User.logIn(this.login.email, this.login.password).then(function (user) {
        console.log(user);
      }, function (error) {
        if (error.code === 211) {
          alert('邮箱不存在')
        } else if (error.code === 210) {
          alert('邮箱和密码不匹配')
        }
      })
    },
    onLogout() {
      AV.User.logOut()
      window.location.reload()
      alert('注销成功')
    }
  }
})