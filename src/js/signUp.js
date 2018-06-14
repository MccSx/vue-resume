window.SignUp = {
  data() {
    return {
      signUp: {
        email: '',
        password: ''
      }
    }
  },
  methods:{
    onSignUp(e) {
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
        // this.currentUser = user
        // this.signUpVisible = false
        this.$emit('tosignup', user)
      }, (error) => {
        alert(error.rawMessage)
      })
    },
    onClickSignUp() {
      this.$emit('clicksignup')
      //loginVisible = true; signUpVisible = false
    },
    onRemoveSignUp() {
      this.$emit('removesignup')
      //signUpVisible = false
    }
  },
  template:`
    <div class="signUp" v-cloak>
      <form class="form" @submit.prevent="onSignUp">
        <h2>注册</h2>
        <button type="button" @click="onRemoveSignUp">关闭</button>
        <div class="row">
          <label>邮箱</label>
          <input type="text" v-model="signUp.email">
        </div>
        <div class="row">
          <label>密码</label>
          <input type="password" v-model="signUp.password">
        </div>
        <div class="actions">
          <button type="submit">提交</button>
          <router-link to="/login">登录</router-link>
        </div>
      </form>
    </div>
  `
}

Vue.component('sign-up', SignUp)