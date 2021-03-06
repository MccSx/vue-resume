
window.Page = {
  data() {
    return {
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
      currentUser: {objectId: '', email: ''},
      shareUrl: '',
      previewUser: {objectId: '', email: ''},
      previewResume: {},
      mode: 'edit',
      skinClass: 'default'
    }
  },
  template:`
  <div>
    <page-aside v-show="mode === 'edit'" :logout-visible="isLogIn()"
      @save="onClickSave"
      @share="onShare"
      @print="print"
      @change="skinPikerVisible = !skinPikerVisible"
      @logout="onLogout"
    ></page-aside>
    <main :class="skinClass">
      <resume :mode="mode" :display-resume="displayResume"></resume>
    </main>
  </div>
  `,
  computed: {
    displayResume: function () {
      return this.mode === 'preview' ? this.previewResume : this.resume
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
        //this.loginVisible = true
        this.$router.push('/login')
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
    onLogin(user) {
      this.currentUser = user
      this.loginVisible = false
    },
    onSignUp() {
      this.currentUser = user
      this.signUpVisible = false
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
    print() {
      window.print()
    },
    onShare() {
      if (this.currentUser.objectId) {
        this.shareVisible = true
      } else {
        alert('请先登录')
      }
    }
  }
}
Vue.component('page-main', window.Page)