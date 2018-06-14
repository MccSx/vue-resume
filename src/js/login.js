window.Login = {
  data() {
    return {
      login: {
        email: '',
        password:''
      }
    }
  },
  methods: {
    onLogin(e) {
      AV.User.logIn(this.login.email, this.login.password).then((user) => {
        user = user.toJSON()
        //this.currentUser = user
        //this.loginVisible = false
        this.$emit('tologin', user)
      }, (error) => {
        if (error.code === 211) {
          alert('邮箱不存在')
        } else if (error.code === 210) {
          alert('邮箱和密码不匹配')
        }
      })
    },
    onClickSignUp() {
      this.$emit('clicksignup')
      //signUpVisible = true; loginVisible = false
    },
    onRemoveLogin() {
      this.$emit('removelogin')
      //loginVisible = false
    }
  },
  template:`
  <div class="login" v-cloak>
    <form class="form" @submit.prevent="onLogin">
      <h2>登录</h2>
      <button type="button" @click="onRemoveLogin">关闭</button>
      <div class="row">
        <label>邮箱</label>
        <input type="text" v-model="login.email">
      </div>
      <div class="row">
        <label>密码</label>
        <input type="password" v-model="login.password">
      </div>
      <div class="actions">
        <button type="submit">提交</button>
        <router-link to="/signUp">注册</router-link>
      </div>
    </form>
  </div>
  `
}

Vue.component('login', Login)