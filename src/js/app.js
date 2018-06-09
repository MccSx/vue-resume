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
      phone: '12312341234',
      skills: [
        {name: '静态页面制作', description: '完美实现1:1设计稿'},
        {name: '静态页面制作', description: '完美实现1:1设计稿'},
        {name: '静态页面制作', description: '完美实现1:1设计稿'},
        {name: '静态页面制作', description: '完美实现1:1设计稿'}
      ]
    },
    signUp: {
      email: '',
      password: ''
    },
    login: {
      email: '',
      password:''
    },
    currentUser: {objectId: '', email: ''}
  },
  methods: {
    edit(key, value) {
      let reg = /\[(\d+)\]/g
      key = key.replace(reg, (match, number) => {return `.${number}`})
      let keys = key.split('.')
      // keys = ['skills', '0', 'name']
      let result = this.resume
      for (let i = 0; i < keys.length; i++) {
        if (i === keys.length - 1) {
          result[keys[i]] = value
          // this.resume['skills']['0']['name'] = value
        } else {
          result = result[keys[i]]        
        }
        // i=0 result = result['skills']
        // i=1 result = result['0']
        // i=2 result = result['name']
        // result = result['skills']['0']['name']
      }
    },
    isLogIn() {
      return !!this.currentUser.objectId
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
      user.save().then(() => {
        alert('保存成功')
      }, () => {
        alert('保存失败')
      })
    },
    onSignUp(e){
      let user = new AV.User()
      // 设置用户名
      user.setUsername(this.signUp.email)
      // 设置密码
      user.setPassword(this.signUp.password)
      user.setEmail(this.signUp.email)
      user.signUp().then((user) => {
        alert('注册成功')
        user = user.toJSON()
        this.currentUser = user
        this.signUpVisible = false
      }, (error) => {
        alert(error.rawMessage)
      })
    },
    onLogin(e){
      AV.User.logIn(this.login.email, this.login.password).then((user) => {
        user = user.toJSON()
        this.currentUser = user
        this.loginVisible = false
      }, (error) => {
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
    },
    getResume() {
      var query = new AV.Query('User')
      query.get(this.currentUser.objectId).then((user) => {
        Object.assign(this.resume, user.toJSON().resume)
      }, (error) => {
        console.log(error)
      })
    },
    addSkill() {
      this.resume.skills.push({name: '请添加技能名称', description: '请添加技能描述'})
    },
    removeSkill(index) {
      this.resume.skills.splice(index, 1)
    }
  }
})

let currentUser = AV.User.current()
if (currentUser) {
  vm.currentUser = currentUser.toJSON()
  vm.getResume()
}