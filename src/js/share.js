Vue.component('share', {
  props:['shareLink'],
  template:`
    <div class="share" v-cloak>
      <h2>你可以把链接分享给面试官</h2>
      <textarea readonly>{{shareLink}}</textarea>
    </div>
  `
})