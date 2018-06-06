Vue.component('editable-span', {
  props: ['value'],
  data() {
    return {
      editing: false
    }
  },
  template: `
  <span class="editableSpan">
    <span v-show="!editing">{{value}}</span>
    <input type="text" v-show="editing" :value="value" @input="triggerEdit">
    <button @click="editing = !editing">编辑</button>
  </span>
  `,
  methods: {
    triggerEdit(e) {
      this.$emit('edit', e.target.value)
    }
  }
})