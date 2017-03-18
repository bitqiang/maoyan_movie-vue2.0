<template>
  <div>
  <transition v-if='maoyan'></transition>  
    <div v-if="!maoyan">
      <!--   标题部分 -->
    <div class="header-title">
      <div class="back" @click='backLastPage'>
        <div></div>
      </div>
      <div class="title"> 短评-- {{commentsMsg.subject.title}}</div>
      <div class="back"></div>
    </div>

<!-- 评论部分 -->
  <div class="discuss">
    <h3>热门评论</h3>
    <div v-for="item in commentsMsg.comments">
       <div class="rating">
          <star :score="item.rating.value*2"></star>
         <span>{{item.created_at}}</span>
       </div>
        <p class="author-content"> {{item.content}} </p>
        <div class="img"> 
          <img :src='item.author.avatar' :alt="item.author.alt">
          <span>{{item.author.name}}</span>
          <span class="endorse">{{ item.useful_count}} 赞同</span>
        </div>
    </div>
  </div> 
    </div>

  </div>
</template>

<script>
import transition from './transition'
import star from './star/star'
export default {
  name: 'smallComment',
  data(){
    return{
      maoyan:true,
      commentsMsg:{
      comments:[{
        rating:{
          max:'',
          value:''
        },
        useful_count:'',
        author:{
          name:'',
          avatar:'',
          alt:'',
          signature:'',
          id:''
        },
        created_at:'',
        content:'',
      }],
      total:'',
      subject:{
        title:''
      }
    }
    }
  },
  components:{
    star,transition
  },
  mounted:function () {
    // body...
    this.$http.jsonp('https://api.douban.com/v2/movie/subject/' + this.$route.params.id + '/comments?apikey=0b2bdeda43b5688921839c8ecb20399b&start=0&count=20&client=something&udid=dddddddddddddddddddddd')
    .then(function(response){
      this.maoyan = false
      this.commentsMsg = response.body
      console.log(response);
    })
    .catch(function(response){
      console.log(response);
    })
  },
  methods:{
    backLastPage:function(){
      window.history.go(-1)
    }
  },
 
}
</script>

<style scoped>
p{
  margin:0;
  padding: 0;
}
.header-title{
  display: flex;
  padding-top: 10px;
  box-sizing: border-box;
  height: 50px;
  width: 100%;
  background-color: #f1f1f1;
  color: #000;
  font-size: 20px;
}
.header-title .back{
  width: 50px;
  margin-top: -8px;
  margin-left: 2px;
  position: relative;
  cursor: pointer;
}
.header-title .back div{
  position: absolute;
    top: 18px;
    left: 18px;
    height: 13px;
    width: 13px;
    border: 2px solid #5d4e4e;
    border-width: 0 0 2px 2px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
}
.header-title .title{
  -webkit-box-flex: 1;
  flex:1;
  text-align: center;
}



.discuss{
  margin: 15px;
}
.discuss h3{
  margin-top: 15px;
  color: #666;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 5px;
}
.rating{
  margin-top: 10px;
}
 .star{
  display:inline-block;
  padding-left: 10px;
}
.star .star-msg{
  padding-bottom: 20px;
}
.author-content{
  color: #333;
  margin-bottom: 10px;
}
.discuss .img{
  border-bottom: 1px solid #000;
  padding-bottom: 10px;
}
.img img{
  border-radius: 50%;
  overflow: hidden;
}
.endorse{
  float: right;
  margin-top: 33px
}
</style>
