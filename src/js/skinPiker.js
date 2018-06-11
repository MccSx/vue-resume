Vue.component('skin-piker', {
  methods:{
    changeSkin(name) {
      //this.skinClass = name
      this.$emit('toChangeSkin', name)
    }
  },
  template:`
    <div class="skinPiker" v-cloak>
      <button class="default" @click="changeSkin('default')">默认</button>
      <button class="dark" @click="changeSkin('dark')">暗黑</button>
    </div>
  `
})