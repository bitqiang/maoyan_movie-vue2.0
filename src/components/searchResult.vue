<template>
  <div>
    <v-header></v-header> 
    <transition v-if='maoyan'></transition>
    <div v-if='!maoyan'>
      <h1  class="title"> {{val}} 搜索结果，共{{search_result.total}} 条 </h1>
      <div class="show" v-for='(item,index) in search_result.subjects' @click="serch(item.id)" >
        <img :src="item.images.small" :alt="item.alt">
        <div class="message">
          <h2> {{item.title}} </h2>
          <star :score='item.rating.average'></star>
          <p>{{item.rating.average}}分{{item.collect_count}}评分</p>
          <p>{{item.year}}年</p>
          <p></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vHeader from "./header/header"
import transition from './transition'
import star from './star/star'
export default {
  name: 'app',
  data(){
    return{
      maoyan:true,
      val:'',
      search_result: {
        total: '',
        subjects: [{
          rating: {
            max: '',
            average: ''
          },
          genres: [],
          title: '',
          year: '',
          images: {
            small: '',
            large: '',
            medium: ''
          },
          directors: [{
            name: ''
          }],
          casts: [{
            name: '',
            id: ''
          }],
          collect_count: '',
          alt: '',
          id: ''
        }]
      }
    }
  },
  components:{
    vHeader,
    transition,
    star
  },
  created: function () {
    // body...
    this.showMoreMsg()
  },
  watch:{
    $route: 'showMoreMsg'
  },
  methods:{
    showMoreMsg:function(){
      this.val = this.$route.query.name
      const serchUrl = 'https://api.douban.com/v2/movie/search?q=' + this.val
      this.$http.jsonp(serchUrl)
      .then(function(response){
        this.maoyan = false
        this.search_result = response.body
      })
      .catch(function(response){
        console.log(response)
      })
    },
    serch:function(str){
      const path = '/movie/' + str
      this.$router.push({path: path})
    }
  }
  
}
</script>

<style scoped>
h1{
  font-size: 22px;
  font-weight: bold;
  text-align: center;
}
.show{
  display: flex;
  border-bottom: solid 1px #000;
}
.show img{
  margin:10px;

}
.message{
  margin-top: 10px;
  font-size: 15px;
}
</style>
