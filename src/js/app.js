let vm = new Vue({
  el: '#app',
  data: {
    loginVisible: false,
    signUpVisible: false,
    shareVisible: false,
    skinPikerVisible: false,
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
      ],
      projects: [
        {name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请详细描述'},
        {name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请详细描述'}
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
    currentUser: {objectId: '', email: ''},
    shareUrl: '',
    previewUser: {objectId: '', email: ''},
    previewResume: {},
    mode: 'edit',
    skinClass: 'default'
  },
  computed: {
    displayResume: function () {
      return this.mode === 'preview' ? this.previewResume : this.resume
    }
  },
  watch: {
    'currentUser.objectId': function (newValue, oldValue) {
      if (newValue) {
        this.getResume(this.currentUser).then((resume) => {
          this.resume = resume
        })
      }
    }
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
      user.set('resume', this.resume)
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
    getResume(user) {
      var query = new AV.Query('User')
      return query.get(user.objectId).then((user) => {
        return user.toJSON().resume
      }, (error) => {
        console.log(error)
      })
    },
    addSkill() {
      this.resume.skills.push({name: '请添加技能名称', description: '请添加技能描述'})
    },
    removeSkill(index) {
      this.resume.skills.splice(index, 1)
    },
    addProject() {
      this.resume.projects.push({name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请详细描述'})
    },
    removeProject(index) {
      this.resume.projects.splice(index, 1)
    },
    print() {
      window.print()
    },
    changeSkin(name) {
      this.skinClass = name
    }
  }
})

//获取当前用户
let currentUser = AV.User.current()
if (currentUser) {
  vm.currentUser = currentUser.toJSON()
  vm.shareUrl = location.origin + location.pathname + '?user_id=' + vm.currentUser.objectId
  vm.getResume(vm.currentUser).then((resume) => {
    vm.resume = resume
  })
}

//获取预览用户
let search = location.search
let reg = /user_id=([^&]+)/
let matches = search.match(reg)
let userId
if (matches) {
  userId = matches[1]
  vm.mode = 'preview'
  vm.getResume({objectId: userId}).then((resume) => {
    vm.previewResume = resume
  })
}