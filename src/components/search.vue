<template>
  <div>
    <div class="search-wrap">
      <span @click="notSubmit()" class="notSubmit"> < </span>
      <input v-model="query" @keyup.enter="submit()" placeholder="搜你想搜的" >
      <span class="search-btn" @click="submit()">搜索</span>
    </div>
    <div class="hot-search">
      <h3>热门搜索</h3>
      <div >
      <p v-for="item in hotSearch" @click="search(item.id)">  {{ item.name}} </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
      return {
        query: '',
        hotSearch: [
          {name: '金刚狼3', id: '25765735'},
          {name: '一条狗的使命', id: '6873143'},
          {name: '生化危机:终章', id: '20471852'},
          {name: '乐高蝙蝠侠', id: '26145033'},
          {name: '爱乐之城', id: '25934014'},
          {name: '欢乐好声音', id: '26354572'}
        ]
      }
    },
  components:{
  },
  methods: {
    submit:function () {
      this.$router.push({path:'/searchResult' , query:{name: this.query}})
      this.query = ''
      // body...
    },
    search:function(str){
      const path = '/movie/' + str
      this.$router.push({path: path})
    },
    notSubmit:function(){
      window.history.go(-1)
    }

  }
}
</script>

<style scoped>
.search-wrap{
  padding: 5px;
  border-bottom: solid 1px #f3f5f4;
  background-color: #ffffff;
}
.notSubmit{
    display: inline-block;   
    line-height: 27px;   
    height: 27px;   
    padding: 0 10px;   
    border-radius: 5px;   
    font-size: 20px;  
}
.search-wrap input{
  width: 290px;
  height: 30px;
  padding-left: 20px;
  font-size: 12px;
  border:0;
  border-radius: 8px;
  background-color: #f3f5f4;
}
.search-btn{
  font-weight: bold;
  font-size: 15px;
}
.hot-search h3{
  font-size: 17px;
  border-bottom: solid 1px #f3f5f4;
  margin:5px;
}
.hot-search div{
  float: left;
}
.hot-search p{
  float: left;
  margin-left: 20px;
  border-radius: 5px;
  font-size: 15px
}


</style>
