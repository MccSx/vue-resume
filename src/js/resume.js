Vue.component('resume', {
  props:['mode','displayResume'],
  methods:{
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
    }
  },
  template:`
  <div class="resumeContent">
    <button class="button" @click="mode = 'edit'">当前用户</button>
    <button class="button" @click="mode = 'preview'">预览用户</button>
    <section class="profile">
      <h1>
        <editable-span :disabled="mode === 'edit'" :value="displayResume.name" v-on:edit="edit('name', $event)"></editable-span>
      </h1>
      <p>
        应聘职位：<editable-span :disabled="mode === 'edit'" :value="displayResume.jobTitle" v-on:edit="edit('jobTitle', $event)"></editable-span>
      </p>
      <p>
        <editable-span :disabled="mode === 'edit'" :value="displayResume.birthday" v-on:edit="edit('birthday', $event)"></editable-span>
        |
        <editable-span :disabled="mode === 'edit'" :value="displayResume.gender" v-on:edit="edit('gender', $event)"></editable-span>
        |
        <editable-span :disabled="mode === 'edit'" :value="displayResume.email" v-on:edit="edit('email', $event)"></editable-span>
        |
        <editable-span :disabled="mode === 'edit'" :value="displayResume.phone" v-on:edit="edit('phone', $event)"></editable-span>
      </p>
    </section>
    <section class="skills">
      <h2>技能</h2>
      <ul>
        <li v-for="(skill,index) in displayResume.skills">
          <editable-span :disabled="mode === 'edit'" :value="skill.name" v-on:edit="edit('skills['+index+'].name', $event)"></editable-span>
          <div class="description">
            <editable-span :disabled="mode === 'edit'" :value="skill.description" v-on:edit="edit('skills['+index+'].description', $event)"></editable-span>
          </div>
          <button class="remove" v-if="index>=4" @click="removeSkill(index)">X</button>
        </li>
        <li class="add" v-show="mode === 'edit'">
          <button @click="addSkill">添加</button>
        </li>
      </ul>
    </section>
    <section class="projects">
      <h2>项目经历</h2>
      <ol>
        <li v-for="(project, index) in displayResume.projects">
          <header>
            <div class="start">
              <h3 class="name">
                <editable-span :disabled="mode === 'edit'" :value="project.name" v-on:edit="edit('projects['+index+'].name', $event)"></editable-span>
              </h3>
              <span class="link">
                <editable-span :disabled="mode === 'edit'" :value="project.link" v-on:edit="edit('projects['+index+'].link', $event)"></editable-span>
              </span>
            </div>
            <div class="end">
              <span class="keywords">
                <editable-span :disabled="mode === 'edit'" :value="project.keywords" v-on:edit="edit('projects['+index+'].keywords', $event)"></editable-span>
              </span>
            </div>
          </header>
          <p class="description">
            <editable-span :disabled="mode === 'edit'" :value="project.description" v-on:edit="edit('projects['+index+'].description', $event)"></editable-span>
          </p>
          <button class="remove" v-if="index>=2" @click="removeProject">X</button>
        </li>
        <li class="add" v-show="mode === 'edit'">
          <button @click="addProject">添加</button>
        </li>
      </ol>
    </section>
  </div>
  `
})