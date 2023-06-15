<template>
  <div class="test">
   <h3>组件 {{cname}}</h3>
    <form>
      <fieldset>
        <legend>表单</legend>
        <label for="ka">测试keep-alive：</label><input id="ka" type="text" />
      </fieldset>
    </form>
  </div>
</template>
<script>
export default {
  name:'test-com',
  data(){
    return {
      cname:'',
      // large:new Array(31457280).fill(1), //大对象
    }
  },
  created() {
    this.timerID = null
  },
  mounted(){
    this.cname = this.$route.query.name
    console.log('[test] mounted')
  },
  activated() {
    console.log(`[test] ${this.cname} activated`)
    // this.timerID = setInterval(()=>{
    //   const data = {
    //     counter: 0,
    //     hugeString: new Array(31457280).fill('x') // 30M
    //   };
    //   console.log(this.cname,'-timer:',this.timerID)
    //   return function cb() {
    //     data.counter++; // data object is now part of the callback's scope
    //     console.log(data.counter);
    //   }
    // },1000)
    // window.addEventListener('Test',function(){
    //    console.log('test method')
    // })
    window.addEventListener('Test',this.test) // 回调函数执行几次？
  },
  deactivated() {
    console.log(`[test] ${this.cname} deactivated`)
    // window.removeEventListener('Test',this.test)
  },
  methods:{
    test(){
      console.log('test method')
    }
  }
}
</script>
<style>
.test{
  width: 400px;
  height:300px;
  border: 1px #2c3e50 solid;
  border-radius: 5px;
  padding:10px;
}
</style>