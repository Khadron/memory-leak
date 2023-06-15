<template>
  <div id="app">
    <p>
      <button @click="addTag()">新增Tag</button>
      <button @click="delTag()">删除Tag</button>
      <button @click="go">触发自定义事件Test</button>
      <span style="margin-left: 10px;">内存已使用<b>{{ usedJSHeapSize }}</b></span>
    </p>
    <ul class="tag-views">
      <div class="tag-views-item" v-for="(index) in tagViews" :key="index">
        <button class="tag-views-item-tab" @click="toPage(index)">组件{{ index }}</button>
        <button @click="closePage(index)">x</button>
      </div>
    </ul>
    <keep-alive max="">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      usedJSHeapSize: '0MB',
      tagViews: []
    }
  },
  mounted() {
    setInterval(() => {
      this.usedJSHeapSize = (performance.memory.usedJSHeapSize / 1000 / 1000).toFixed(2) + "MB"
    }, 3000)
  },
  methods: {
    toPage(target) {
      if (this.$route.name !== `Test${target}`) {
        this.$router.$push(target)
      }
    },
    closePage(target) {
      this.delTag(target)
    },
    addTag() {
      let index = this.tagViews.length > 0 ? Math.max(...this.tagViews) : 0
      index++
      this.tagViews.push(index)
      this.$router.$append(index)
      this.$router.$push(index)
    },
    delTag(index) {
      if (this.tagViews.length == 0) return
      if (!index) {
        index = Math.max(...this.tagViews)
      }
      if (this.$route.path !== '/home') {
        this.$router.push('/home')
      }
      let delIndex = this.tagViews.findIndex((item) => item == index)
      this.$delete(this.tagViews, delIndex)
    },
    go() {
      window.dispatchEvent(new CustomEvent('Test', {detail: {}}))
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  padding: 10px
}

.tag-views {
  margin: 0;
  padding: 0 10px;
  overflow-y: auto;
  overflow-x: hidden;
}

.tag-views-item {
  float: left;
  min-width: 60px;
  height: 40px;
  line-height: 40px;
  margin: 0 5px;
  cursor: pointer;
}

.tag-views-item-tab {
  background-color: #2c3e50;
  border: 1px #51779e solid;
  height: 30px;
  font-size: 14px;
  color: #FFF
}

</style>
